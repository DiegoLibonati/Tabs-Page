export interface Component {
  cleanup?: () => void;
}

export interface TabComponent extends Component, HTMLButtonElement {}
