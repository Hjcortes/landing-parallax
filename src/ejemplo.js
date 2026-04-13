// https://github.com/nk-o/jarallax
//
import jarallax from 'components/jarallax';

// eslint-disable-next-line no-undef
const { Component } = React;

class Jarallax extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-undef
    this.$el = React.createRef();
  }

  // init on mount.
  componentDidMount() {
    jarallax(this.$el.current, this.props.options);
  }

  // reinit when props changed.
  componentDidUpdate(prevProps) {
    if (
      !this.isDestroyed &&
      JSON.stringify(prevProps) !== JSON.stringify(this.props)
    ) {
      jarallax(this.$el.current, "destroy");
      jarallax(this.$el.current, this.props.options);
    }
  }

  // destroy on unmount.
  componentWillUnmount() {
    this.isDestroyed = true;
    jarallax(this.$el.current, "destroy");
  }

  render() {
    const { options, className = "" } = this.props;

    return (
      <div className={`jarallax ${className}`} ref={this.$el}>
        <img className="jarallax-img" src={options.src} />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [
        {
          uid: 1,
          options: {
            src: "https://source.unsplash.com/random/1280x720",
            speed: 0.6
          }
        }
      ]
    };

    this.addNewBlock = this.addNewBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
    this.changeBlockOptions = this.changeBlockOptions.bind(this);
  }

  addNewBlock() {
    const { blocks } = this.state;

    // prepare random image
    const randomImage = `https://source.unsplash.com/random/1280x72${
      blocks.length % 10
    }`;
    let uid = 1;

    if (blocks[blocks.length - 1]) {
      uid = blocks[blocks.length - 1].uid + 1;
    }

    this.setState({
      blocks: [
        ...blocks,
        {
          uid: uid,
          options: {
            src: randomImage,
            speed: 0.6
          }
        }
      ]
    });
  }

  removeBlock(id) {
    const { blocks } = this.state;

    this.setState({
      blocks: blocks.filter((data, i) => {
        return id !== i;
      })
    });
  }

  changeBlockOptions(id, newOptions) {
    const { blocks } = this.state;

    this.setState({
      blocks: blocks.map((data) => {
        return {
          ...data,
          options: {
            ...data.options,
            ...newOptions
          }
        };
      })
    });
  }

  render() {
    const { blocks } = this.state;

    return (
      <div>
        <button className="btn btn-primary" onClick={this.addNewBlock}>
          + Add Parallaxed Block
        </button>
        <br />
        <br />
        {blocks.map((elData, i) => (
          <div className="jarallax-wrap" key={elData.uid}>
            <Jarallax {...elData} />
            <div className="jarallax-controls">
              <div className="form-group">
                <label>Parallax Type</label>
                <select
                  className="form-control"
                  value={elData.options.type || "scroll"}
                  onChange={(e) => {
                    this.changeBlockOptions(i, {
                      type: e.target.value
                    });
                  }}
                >
                  <option value="scroll">Scroll</option>
                  <option value="scale">Scale</option>
                  <option value="opacity">Opacity</option>
                  <option value="scroll-opacity">Scroll Opacity</option>
                  <option value="scale-opacity">Scale Opacity</option>
                </select>
                <label>Parallax Speed</label>
                <input
                  className="form-control"
                  type="number"
                  min="-1"
                  max="2"
                  step="0.1"
                  value={elData.options.speed}
                  onChange={(e) => {
                    this.changeBlockOptions(i, {
                      speed: e.target.value
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <button
                  className="jarallax-remove-btn btn btn-secondary"
                  onClick={() => {
                    this.removeBlock(i);
                  }}
                >
                  Remove Block
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
