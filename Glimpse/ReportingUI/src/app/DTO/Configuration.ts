import { SqlParam } from './SqlParam';

export class Configuration
{
    ReportName:string;
    StoredProcedureName:string;
    HasDefaultFilters;bool;
    Parameters:SqlParam[];
}