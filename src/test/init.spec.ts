import { environment as devEnv } from 'src/environments/environment';
import { environment as stagingEnv } from 'src/environments/environment.staging';
import { environment as prodEnv } from 'src/environments/environment.prod';

beforeAll(() => {
  devEnv.isTesting = true;
  stagingEnv.isTesting = true;
  prodEnv.isTesting = true;
});
