import { getVehicle } from './configs/query';
import { clientApollo } from './components/utils';

describe('async gertVehicles', () => {

  it('should get the vehicle ',async  () => {
    expect(await getVehicle(clientApollo,'14/')).toBe('Snowspeeder')

    })
  });