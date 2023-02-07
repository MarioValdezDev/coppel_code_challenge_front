import { Employee } from "../employee";
import { Inventory } from "../inventory";
import { PolicyResponse } from "./policy_response";

export interface PolicyData{
    policy: PolicyResponse;
    employee:Employee;
    articleDetail: Inventory;
}
