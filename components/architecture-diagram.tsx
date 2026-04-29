'use client';

import { addEdge, Background, ConnectionMode, Controls, Handle, MarkerType, Position, ReactFlow, reconnectEdge, useEdgesState, useNodesState } from '@xyflow/react';
import { JSX, useCallback, useEffect, useMemo } from 'react';

import type { ArchitectureEdge, ArchitectureNode } from '@/content/companies';
import type { Connection, Edge, Node } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const NODE_WIDTH = 280;
const NODE_HEIGHT = 120;

type LeafNodeType = Exclude<NonNullable<ArchitectureNode['type']>, 'group'>;

const typeStyles: Record<LeafNodeType, string> = {
  client: 'border-blue-500/60 bg-blue-50 dark:bg-blue-950/40',
  server: 'border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/40',
  database: 'border-amber-500/60 bg-amber-50 dark:bg-amber-950/40',
  queue: 'border-purple-500/60 bg-purple-50 dark:bg-purple-950/40',
  service: 'border-slate-400/60 bg-slate-50 dark:bg-slate-900/40',
  external: 'border-pink-500/60 bg-pink-50 dark:bg-pink-950/40',
};

const typeLabels: Record<LeafNodeType, string> = {
  client: '클라이언트',
  server: '서버',
  database: '데이터베이스',
  queue: '큐',
  service: '서비스',
  external: '외부',
};

type NodeData = { label: string; description?: string; type?: ArchitectureNode['type'] };

const handleClass = 'bg-slate-400!';

function FourSideHandles() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="t-top" className={handleClass} />
      <Handle type="source" position={Position.Top} id="s-top" className={handleClass} />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className={handleClass} />
      <Handle type="source" position={Position.Bottom} id="s-bottom" className={handleClass} />
      <Handle type="target" position={Position.Left} id="t-left" className={handleClass} />
      <Handle type="source" position={Position.Left} id="s-left" className={handleClass} />
      <Handle type="target" position={Position.Right} id="t-right" className={handleClass} />
      <Handle type="source" position={Position.Right} id="s-right" className={handleClass} />
    </>
  );
}

function ArchNode({ data }: { data: NodeData }) {
  const isLeaf = data.type && data.type !== 'group';
  const style = isLeaf ? typeStyles[data.type as LeafNodeType] : 'border-slate-300 bg-background';

  return (
    <div className={`flex flex-col justify-center rounded-md border px-4 py-2 shadow-sm ${style}`} style={{ width: NODE_WIDTH, minHeight: NODE_HEIGHT }}>
      <FourSideHandles />
      <div className="text-base font-medium leading-tight wrap-break-word">{data.label}</div>
      {data.description ? <div className="mt-0.5 text-sm leading-tight text-muted-foreground wrap-break-word">{data.description}</div> : null}
      {isLeaf ? <div className="mt-1 text-xs tracking-wide text-muted-foreground">{typeLabels[data.type as LeafNodeType]}</div> : null}
    </div>
  );
}

function GroupNode({ data }: { data: NodeData }) {
  return (
    <div className="h-full w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 dark:border-slate-700 dark:bg-slate-900/20">
      <FourSideHandles />
      <div className="px-4 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{data.label}</div>
    </div>
  );
}

const nodeTypes = { arch: ArchNode, archGroup: GroupNode };

export function ArchitectureDiagram({ nodes, edges }: { nodes: ArchitectureNode[]; edges: ArchitectureEdge[] }): JSX.Element {
  const initialNodes = useMemo<Node<NodeData>[]>(
    () =>
      nodes.map((node) => {
        const isGroup = node.type === 'group';
        return {
          id: node.id,
          type: isGroup ? 'archGroup' : 'arch',
          position: node.position,
          parentId: node.parent,
          extent: node.parent ? ('parent' as const) : undefined,
          data: { label: node.label, description: node.description, type: node.type },
          style: isGroup ? { width: node.width, height: node.height } : undefined,
          selectable: !isGroup,
          draggable: !isGroup,
          zIndex: isGroup ? -1 : 0,
        };
      }),
    [nodes],
  );

  const initialEdges = useMemo<Edge[]>(
    () =>
      edges.map((edge, index) => ({
        id: `e${index}`,
        source: edge.source,
        target: edge.target,
        sourceHandle: `s-${edge.sourceHandle ?? 'bottom'}`,
        targetHandle: `t-${edge.targetHandle ?? 'top'}`,
        type: 'smoothstep',
        label: edge.label,
        markerEnd: { type: MarkerType.ArrowClosed },
        markerStart: edge.bidirectional ? { type: MarkerType.ArrowClosed } : undefined,
        style: edge.dashed ? { strokeDasharray: '6 4', stroke: '#94a3b8' } : undefined,
        zIndex: edge.dashed ? 1000 : undefined,
      })),
    [edges],
  );

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState<Node<NodeData>>(initialNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  useEffect(() => {
    setFlowNodes(initialNodes);
  }, [initialNodes, setFlowNodes]);

  useEffect(() => {
    setFlowEdges(initialEdges);
  }, [initialEdges, setFlowEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setFlowEdges((eds) => addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
    },
    [setFlowEdges],
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setFlowEdges((eds) => reconnectEdge(oldEdge, newConnection, eds));
    },
    [setFlowEdges],
  );

  return (
    <div className="h-[calc(100vh-6rem)] min-h-200 w-full overflow-hidden rounded-lg border bg-card">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onReconnect={onReconnect}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable
        edgesReconnectable
        edgesFocusable={false}
        connectionMode={ConnectionMode.Loose}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
