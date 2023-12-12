export interface Color {
  id: number;
  name: string;
}

export interface TreeKind {
  id: number;
  name: string;
  description: string;
}

export interface TreeVersion {
  id: number;
  kind_of_tree: number;
  date_created: string;
  major: number;
  minor: number;
  valid: boolean;
  deleted: boolean;
}

export interface TreeShort {
  id: number;
  date_created: string;
  created_by: string;
  tree_version: TreeVersion;
}

export interface WorkingNode {
  number: number;
  display_name: string;
  description: string;
  data_type: number;
  data_value: number | string | boolean | any[];
  comparison: string;
  list_comparison: string;
  explanation: string;
  true_number: number;
  true_explanation: string;
  true_color: number;
  false_number: number;
  false_explanation: string;
  false_color: number;
}

export interface TreeNode extends WorkingNode {
  date_created: string;
  id: string;
  true_id: string;
  false_id: string;
}

export class NodeOut {
  number: number;
  display_name: string;
  description: string;
  data_type_id: number;
  data_value: number | string | boolean | any[];
  comparison: string;
  list_comparison: string;
  explanation: string;
  true_number: number;
  true_explanation?: string;
  true_color_id?: number;
  false_number: number;
  false_explanation?: string;
  false_color_id?: number;

  constructor(workingNode: WorkingNode) {
    this.number = workingNode.number;
    this.display_name = workingNode.display_name;
    this.description = workingNode.description;
    this.data_type_id = workingNode.data_type;
    this.data_value = workingNode.data_value;
    this.comparison = workingNode.comparison;
    this.list_comparison = workingNode.list_comparison;
    this.explanation = workingNode.explanation;
    this.true_number = workingNode.true_number;
    if (workingNode && workingNode.true_explanation != '') {
      this.true_explanation = workingNode.true_explanation;
    }
    if (workingNode && workingNode.true_color != 0) {
      this.true_color_id = workingNode.true_color;
    }
    this.false_number = workingNode.false_number;
    if (workingNode && workingNode.false_explanation != '') {
      this.false_explanation = workingNode.false_explanation;
    }
    if (workingNode && workingNode.false_color != 0) {
      this.false_color_id = workingNode.false_color;
    }
  }
}

export interface WorkingLeaf {
  number: number;
  display_name: string;
  result: boolean;
  color: number;
}

export interface TreeLeaf extends WorkingLeaf {
  date_created: string;
  id: string;
}

export class LeafOut {
  number: number;
  display_name: string;
  result: boolean;
  color_id?: number;

  constructor(workingLeaf: WorkingLeaf) {
    this.number = workingLeaf.number;
    this.display_name = workingLeaf.display_name;
    this.result = workingLeaf.result;
    if (workingLeaf.color && workingLeaf.color != 0) {
      this.color_id = workingLeaf.color;
    }
  }
}

export interface WorkingTree {
  created_by: string;
  kind_of_tree: number;
  root: number;
}

export interface TreeDisplay extends WorkingTree {
  id: number;
  nodes: TreeNode[];
  leafs: TreeLeaf[];
  version: string;
  date_created: string;
}

export class TreeOut {
  created_by: string;
  kind_of_tree: number;
  root: number;
  nodes: NodeOut[];
  leafs: LeafOut[];

  constructor(
    workingTree: WorkingTree | undefined,
    treeElements: Map<number, WorkingNode | WorkingLeaf>,
    created_by: string | undefined
  ) {
    if (workingTree) {
      this.kind_of_tree = workingTree.kind_of_tree;
      this.root = workingTree.root;
    } else {
      this.kind_of_tree = 1;
      this.root = 1;
    }
    this.created_by = created_by ? created_by : 'the editor ui';
    this.nodes = [];
    this.leafs = [];
    treeElements.forEach((v) => {
      if ('true_number' in v) {
        this.nodes.push(new NodeOut(v));
      } else {
        this.leafs.push(new LeafOut(v));
      }
    });
  }
}
