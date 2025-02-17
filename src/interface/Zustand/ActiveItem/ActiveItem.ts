export interface IActiveItem {
  title: string;
  url: string;
}

export interface IActiveItemState {
  activeItem: IActiveItem;
  setActiveItem: (item: IActiveItem) => void;
}