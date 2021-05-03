import { CommonModel } from './common.model';
import { ErrorModel } from './error.model';

export interface TranslationModel {
  common: CommonModel;
  error: ErrorModel;
}
