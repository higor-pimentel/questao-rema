import React from 'react';
import { map } from 'rxjs/operators';
import loadingService from '../../../services/loading.service'

let loading;

function componentWillMount() {
  this.loading = loadingService.getLoading().pipe(map((loadingType) => loadingType.valueOf()));
}

export default () => {


componentWillMount();

return <hr className={loading} />
};
