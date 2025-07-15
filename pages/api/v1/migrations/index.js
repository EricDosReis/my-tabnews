import { createRouter } from 'next-connect';

import controller from 'infra/controller';
import migratorModel from 'models/migrator';

const router = createRouter();

router.get(getHandler).post(postHandler);

async function getHandler(request, response) {
  const pendingMigrations = await migratorModel.listPendingMigrations();

  return response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migratorModel.runPendingMigrations();

  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  return response.status(200).json(migratedMigrations);
}

export default router.handler(controller.errorHandlers);
