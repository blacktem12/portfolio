export type ArchitectureNode = {
  id: string;
  label: string;
  description?: string;
  type?: 'client' | 'server' | 'database' | 'queue' | 'service' | 'external' | 'group';
  position: { x: number; y: number };
  parent?: string;
  width?: number;
  height?: number;
};

export type ArchitectureEdge = {
  source: string;
  target: string;
  label?: string;
  bidirectional?: boolean;
  dashed?: boolean;
  sourceHandle?: 'top' | 'bottom' | 'left' | 'right';
  targetHandle?: 'top' | 'bottom' | 'left' | 'right';
};

export type ArchitectureDiagram = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export type Project = {
  slug: string;
  name: string;
  period?: string;
  summary: string;
  achievements: string[];
  stack: Stack;
  architecture?: ArchitectureDiagram;
};

export type Stack = {
  frontend: { label: 'Frontend'; values: string[] };
  backend: { label: 'Backend'; values: string[] };
  database: { label: 'Database'; values: string[] };
  infra: { label: 'Infrastructure'; values: string[] };
  testTool: { label: 'Test'; values: string[] };
  openSource: { label: 'Open Source'; values: string[] };
  monitor: { label: 'Monitoring'; values: string[] };
};

export type Company = {
  slug: string;
  name: string;
  period: string;
  role: string;
  projects: Project[];
};

export const companies: Company[] = [
  {
    slug: 'chobase',
    name: '조베이스',
    period: '2025.05 – 재직중',
    role: '팀장',
    projects: [
      {
        slug: 'infra',
        name: '인프라 구축',
        period: '2026.04 - 진행중',
        summary: '기존 Docker Swarm으로 구성된 인프라 환경을 k8s 환경으로 마이그레이션',
        achievements: [
          '기존 Docker Swarm 환경을 컨트롤플레인 3대 + 워커 13대로 구성된 16노드 온프레미스 Kubernetes 클러스터(v1.35, Cilium CNI, containerd)로 마이그레이션·운영하였습니다.',
          'ArgoCD App-of-Apps 패턴으로 GitOps 워크플로우(PR → CI → Merge → 자동 Sync)를 정립하여, 인프라 및 워크로드를 단일 Git Repository에서 관리하는 구조를 마련했습니다.',
          'Rook-Ceph 분산 스토리지와 Traefik + Gateway API + Cert-Manager를 도입하여 자체 스토리지, 게이트웨이, 인증서 자동화 환경을 확보했습니다.',
          'ETCD, DB, Sealed Secrets 키에 대한 자동 백업 CronJob과 Runbook을 문서화하여 장애 복구 절차를 정립했습니다.',
          'Prometheus, Loki, Promtail로 메트릭 및 로그를 모니터링할 수 있는 환경을 마련했습니다.',
        ],
        stack: {
          frontend: { label: 'Frontend', values: [] },
          backend: { label: 'Backend', values: [] },
          database: { label: 'Database', values: [] },
          infra: {
            label: 'Infrastructure',
            values: ['Kubernetes', 'ArgoCD', 'Cilium', 'Traefik', 'Gateway API', 'cert-manager', 'Sealed Secrets', 'Prometheus', 'Loki', 'Promtail'],
          },
          testTool: { label: 'Test', values: [] },
          openSource: { label: 'Open Source', values: [] },
          monitor: { label: 'Monitoring', values: [] },
        },
        architecture: {
          nodes: [
            { id: 'developer', label: 'Developer', type: 'client', position: { x: 360, y: 0 } },
            { id: 'client', label: 'External Client', type: 'client', position: { x: 1080, y: 0 } },
            { id: 'git', label: 'Git Repository', type: 'external', position: { x: 360, y: 200 } },
            { id: 'argocd', label: 'ArgoCD', type: 'service', position: { x: 360, y: 400 } },
            { id: 'secrets', label: 'Sealed Secrets + cert-manager', type: 'service', position: { x: 0, y: 600 } },
            { id: 'observability', label: 'Prometheus + Loki', type: 'service', position: { x: 720, y: 600 } },
            { id: 'gateway', label: 'Traefik + Gateway API', type: 'service', position: { x: 1080, y: 600 } },
            { id: 'workloads', label: 'Workloads (Services)', type: 'server', position: { x: 360, y: 800 } },
            { id: 'db', label: 'PostgreSQL · Redis', type: 'database', position: { x: 0, y: 1000 } },
            { id: 'ceph', label: 'Rook-Ceph (17 TiB)', type: 'database', position: { x: 720, y: 1000 } },
          ],
          edges: [
            { source: 'developer', target: 'git', label: 'PR / push' },
            { source: 'git', target: 'argocd', label: 'sync' },
            { source: 'argocd', target: 'workloads', label: 'deploy' },
            { source: 'argocd', target: 'gateway', label: 'deploy' },
            { source: 'argocd', target: 'observability', label: 'deploy' },
            { source: 'argocd', target: 'secrets', label: 'deploy' },
            { source: 'client', target: 'gateway', label: 'HTTPS' },
            { source: 'gateway', target: 'workloads', label: 'route' },
            { source: 'workloads', target: 'db' },
            { source: 'workloads', target: 'ceph', label: 'PVC' },
            { source: 'workloads', target: 'observability', label: 'metrics / logs' },
            { source: 'secrets', target: 'workloads', label: 'TLS / secrets' },
          ],
        },
      },
      {
        slug: 'authenticator',
        name: '통합 인증 프로젝트',
        period: '2025.12 - 2026.04',
        summary: 'Ory Stack을 활용한 사내 OIDC Provider 겸 인증, 인가 플랫폼',
        achievements: [
          'Nest.js, React 모노레포부터 Ory Kratos, Hydra, Keto 인프라까지 신규 인증 플랫폼의 설계, 구축을 리드하였습니다.',
          '인증(Ory Kratos), OAuth2/OIDC(Ory Hydra), 권한(Ory Keto)를 통합하고, 마이크로서비스의 인증 및 리소스 권한을 중앙에서 관리할 수 있는 구조를 마련했습니다.',
          'OPL(Ory Permission Language)을 사내 공유 패키지화하여 러닝커브 최소화 및 생산성 향상에 기여했습니다.',
          'Ory Stack을 Port / Adapter로 격리해 추후 SDK 업데이트나 IdP 교체시 더 유연하게 대응할 수 있는 기반을 마련했습니다.',
          'Prometheus, Grafana, AlertManager를 구성하여 모니터링 및 장애를 인지할 수 있는 기반을 마련했습니다.',
        ],
        stack: {
          frontend: {
            label: 'Frontend',
            values: ['React.js', 'Typescript', 'Vite', 'Zustand', 'Axios'],
          },
          backend: {
            label: 'Backend',
            values: ['Nest.js', 'Typescript', 'Prisma', 'Swagger', 'Zod'],
          },
          database: { label: 'Database', values: ['Postgresql', 'Redis'] },
          infra: {
            label: 'Infrastructure',
            values: ['Ubuntu Server 24.04', 'Docker', 'Kubernetes', 'ArgoCD', 'GitOps', 'Turborepo'],
          },
          testTool: { label: 'Test', values: ['Vitest', 'Supertest'] },
          openSource: { label: 'Open Source', values: ['Ory Kratos', 'Ory Hydra', 'Ory Keto'] },
          monitor: { label: 'Monitoring', values: ['Prometheus', 'Grafana', 'AlertManager'] },
        },
        architecture: {
          nodes: [
            { id: 'rp', label: '외부 OIDC Client', description: 'OAuth2 / OIDC 토큰 소비자 (RP)', type: 'external', position: { x: 360, y: 0 } },
            { id: 'client', label: 'React SPA', type: 'client', position: { x: 0, y: 200 } },
            { id: 'backend', label: 'NestJS API', description: '로그인 · 동의 처리', type: 'server', position: { x: 540, y: 200 } },
            { id: 'observability', label: 'Prometheus + Grafana + AlertManager (전체 수집)', type: 'service', position: { x: 1500, y: 200 } },
            { id: 'ory-stack', label: 'Ory Stack', type: 'group', position: { x: 0, y: 400 }, width: 1080, height: 280 },
            { id: 'kratos', label: 'Ory Kratos', description: '사용자 계정 · 세션 관리', type: 'service', position: { x: 40, y: 80 }, parent: 'ory-stack' },
            { id: 'hydra', label: 'Ory Hydra', description: 'OAuth2 / OIDC 토큰 발급', type: 'service', position: { x: 400, y: 80 }, parent: 'ory-stack' },
            { id: 'keto', label: 'Ory Keto', description: '권한 관리 (Zanzibar)', type: 'service', position: { x: 760, y: 80 }, parent: 'ory-stack' },
            { id: 'postgres', label: 'PostgreSQL', type: 'database', position: { x: 400, y: 760 } },
            { id: 'redis-ha', label: 'Redis HA (Sentinel + Master ⟷ Replica)', type: 'group', position: { x: 1100, y: 400 }, width: 720, height: 400 },
            { id: 'redis-sentinel', label: 'Redis Sentinel', type: 'service', position: { x: 220, y: 80 }, parent: 'redis-ha' },
            { id: 'redis-master', label: 'Redis Master', type: 'database', position: { x: 40, y: 240 }, parent: 'redis-ha' },
            { id: 'redis-replica', label: 'Redis Replica', type: 'database', position: { x: 400, y: 240 }, parent: 'redis-ha' },
          ],
          edges: [
            { source: 'rp', target: 'hydra', label: 'OAuth2 / OIDC', targetHandle: 'left' },
            { source: 'client', target: 'backend', label: 'API 호출', sourceHandle: 'right', targetHandle: 'left' },
            { source: 'client', target: 'ory-stack', label: '셀프 서비스' },
            { source: 'backend', target: 'ory-stack', label: '인증 / 권한', bidirectional: true },
            { source: 'ory-stack', target: 'postgres', label: '인증 데이터' },
            { source: 'backend', target: 'redis-ha', label: '세션 r/w', sourceHandle: 'bottom', targetHandle: 'top' },
            { source: 'backend', target: 'observability', dashed: true, sourceHandle: 'right', targetHandle: 'left' },
            { source: 'ory-stack', target: 'observability', dashed: true, sourceHandle: 'right', targetHandle: 'left' },
            { source: 'redis-ha', target: 'observability', dashed: true, sourceHandle: 'right', targetHandle: 'left' },
            { source: 'postgres', target: 'observability', dashed: true, sourceHandle: 'right', targetHandle: 'left' },
          ],
        },
      },
    ],
  },
];
