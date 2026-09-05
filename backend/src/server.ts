import { app } from './app.js';
import { env } from './lib/env.js';

app.listen(env.PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${env.PORT}`);
  console.log(`🔒 Allowed CORS Origin: ${env.FRONTEND_ORIGIN}`);
});
