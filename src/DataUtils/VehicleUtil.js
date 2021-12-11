import _ from 'lodash';
import { AppUtil } from '../utils';

class VehicleUtil {
  id = data => data?._id ?? '';

  title = data => data?.type ?? '';

  image = data => data?.icon ?? '';
}
export default new VehicleUtil();
