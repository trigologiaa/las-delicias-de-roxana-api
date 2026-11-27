const FRAMEWORKS = "node_modules/(@nestjs|@mikro-orm|express)/";

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      from: {},
      name: "no-circular",
      severity: "error",
      to: {
        circular: true,
      },
    },
    {
      from: {
        path: "^src/[^/]+/domain/",
      },
      name: "domain-is-pure",
      severity: "error",
      to: {
        path: ["/application/", "/infrastructure/", FRAMEWORKS],
      },
    },
    {
      from: {
        path: "^src/[^/]+/application/",
      },
      name: "application-has-no-framework",
      severity: "error",
      to: {
        path: ["/infrastructure/", FRAMEWORKS],
      },
    },
    {
      from: {
        path: "^src/shared/kernel/",
      },
      name: "kernel-is-pure",
      severity: "error",
      to: {
        path: ["/infrastructure/", FRAMEWORKS],
      },
    },
    {
      from: {
        path: "/adapter/in/",
      },
      name: "in-adapters-do-not-know-out-adapters",
      severity: "error",
      to: {
        path: "/adapter/out/",
      },
    },
    {
      from: {
        path: "/adapter/out/",
      },
      name: "out-adapters-do-not-know-in-adapters",
      severity: "error",
      to: {
        path: "/adapter/in/",
      },
    },
    {
      from: {
        path: "^src/([^/]+)/",
        pathNot: "^src/shared/",
      },
      name: "contexts-talk-through-input-ports",
      severity: "error",
      to: {
        path: "^src/[^/]+/(domain|application/usecase|infrastructure|testing)/",
        pathNot: ["^src/$1/", "^src/shared/"],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    enhancedResolveOptions: {
      conditionNames: ["import", "require", "node", "default", "types"],
      exportsFields: ["exports"],
    },
    tsConfig: {
      fileName: "tsconfig.json",
    },
    tsPreCompilationDeps: true,
  },
};
