# Las Delicias de Roxana API

## Estado

API en NestJS con MikroORM y PostgreSQL.

## Requisitos

- Node, en la versión de `.nvmrc`
- pnpm
- Docker con Compose

## Cómo levantar el proyecto

```bash
nvm use
pnpm install
docker compose up -d --wait db
pnpm start:dev
```

La API escucha en <http://localhost:3000>. Postgres queda en el puerto **5433** del host (`docker compose down` lo detiene; con `-v` además borra los datos).

Para ejecutar la versión compilada: `pnpm build && pnpm start`.

## Scripts

| Comando                                        | Qué hace                                           |
| ---------------------------------------------- | -------------------------------------------------- |
| `./scripts/verify.sh`                          | Verificación completa                              |
| `./scripts/verify.sh fast`                     | Lint, tipos, arquitectura y tests unitarios        |
| `pnpm lint` / `pnpm lint:fix`                  | Biome: revisar / corregir                          |
| `pnpm typecheck`                               | TypeScript sin emitir                              |
| `pnpm arch:check`                              | Regla de dependencia hexagonal                     |
| `pnpm test`                                    | Tests unitarios, de integración y e2e              |
| `pnpm test:unit`                               | Dominio y casos de uso                             |
| `pnpm test:integration`                        | Adaptadores con Postgres real                      |
| `pnpm test:e2e`                                | Aceptación por HTTP                                |
| `pnpm build`                                   | Compila a `dist/`                                  |
| `pnpm openapi:generate` / `pnpm openapi:check` | Genera / verifica `openapi.json`                   |
| `pnpm migration:create` / `pnpm migration:up`  | Migraciones de MikroORM (necesitan `DATABASE_URL`) |

## Flujo de ramas

El código se promueve entre ramas en el siguiente orden:

```
main -> test -> prod
```

| Rama   | Propósito                | Reglas                                              |
| ------ | ------------------------ | --------------------------------------------------- |
| `main` | Desarrollo e integración | Sin force push ni borrado. Se permite push directo. |
| `test` | Pruebas                  | Solo mediante PR. Sin force push ni borrado.        |
| `prod` | Producción               | Solo mediante PR. Sin force push ni borrado.        |

### Promociones

- Las promociones `main -> test` y `test -> prod` se hacen con **merge commit**, nunca con squash ni rebase.
- Cada promoción se realiza con un Pull Request.

### Integración continua (CI)

El check de CI (`check`) va a ser obligatorio en las tres ramas, pero **se activa cuando exista el CI**. Mientras no exista el job `check`, las reglas de ramas no lo exigen.
