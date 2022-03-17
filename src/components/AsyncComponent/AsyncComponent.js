import { Component } from "react"

const asyncComponent = importComponent => {
  return class AsyncComponent extends Component {
    state = { Component: null }

    componentDidMount() {
      importComponent()
      .then(Component => {
        this.setState({ Component: Component.default });
      });
    }

    render() {
      const { Component } = this.state;
      return Component && <Component {...this.props} />
    }
  }
}

export default asyncComponent;