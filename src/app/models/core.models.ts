export interface WorkingDataType {
  name: string;
  display_name: string;
  kind_of_data: string;
  explanation: string;
}

export interface DataType extends WorkingDataType {
  id: number;
}
