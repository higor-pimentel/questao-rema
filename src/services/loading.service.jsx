import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";
import { LoadingType } from "../components/shared/loading/LoadingType";

const loadingSubject = new Subject();

export const getLoading = () => {
  return loadingSubject.asObservable().pipe(startWith(LoadingType.STOPPED));
};

export const start = () => {
  loadingSubject.next(LoadingType.LOADDING);
};

export const stop = () => {
  loadingSubject.next(LoadingType.STOPPED);
};
