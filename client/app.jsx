
class SignUpView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onChangeHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmitHandler(event) {
    let { toNext, submitData } = this.props;
    let submitPath = '/order/signup';

    event.preventDefault();
    submitData(this.state, submitPath);
    this.resetState();
    toNext();
  }

  resetState() {
    this.setState({ name: '', email: '', password: '' });
  }

  render () {
    let { name, email, password } = this.state;

    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmitHandler}>
          <label>Name</label>
          <input 
          type="text" 
          name="name"
          onChange={this.onChangeHandler} 
          value={name}
          />

          <label>Email</label>
          <input 
          type="email" 
          name="email"
          onChange={this.onChangeHandler} 
          value={email}
          />

          <label>Password</label>
          <input 
          type="password" 
          name="password"
          onChange={this.onChangeHandler} 
          value={password}
          />

          <button>Next</button>

        </form>
      </div>
    );
  }
}

class ShippingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onChangeHandler(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  }

  onSubmitHandler(event) {
    let { toNext, submitData } = this.props;
    let submitPath = '/order/shipping';

    event.preventDefault();
    submitData(this.state, submitPath);
    this.resetState();
    toNext();
  }

  resetState() {
    this.setState({ 
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: ''
     });
  }

  render() {
    let { line1, line2, city, state, zip } = this.state;

    return (
      <div>
        <h3>Shipping Information</h3>
        <form onSubmit={this.onSubmitHandler}>
          <label>Address</label>
          <input
            type="text"
            name="line1"
            value={line1}
            onChange={this.onChangeHandler}
            placeholder="Address Line 1"
          />
          <input
            type="text"
            name="line2"
            value={line2}
            onChange={this.onChangeHandler}
            placeholder="Address Line 2"
          />

          <input
            type="text"
            name="city"
            value={city}
            onChange={this.onChangeHandler}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={state}
            onChange={this.onChangeHandler}
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            value={zip}
            onChange={this.onChangeHandler}
            placeholder="Zip Code"
          />

          <button>Next</button>

        </form>
      </div>
    )
  }
}

class BillingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: '',
      expiration: '',
      cvv: '',
      zip: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onChangeHandler(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  }

  onSubmitHandler(event) {
    let { toNext, submitData } = this.props;
    let submitPath = '/order/billing';

    event.preventDefault();
    submitData(this.state, submitPath);
    this.resetState();
    toNext();
  }

  resetState() {
    this.setState({ 
      cardNum: '',
      expiration: '',
      cvv: '',
      zip: '' 
    });
  }

  render() {
    let { cardNum, expiration, cvv, zip } = this.state;

    return (
      <div>
        <h3>Billing Information</h3>
        <form onSubmit={this.onSubmitHandler}>
          <label>Credit Card Info</label>
          <input
            type="text"
            name="cardNum"
            value={cardNum}
            onChange={this.onChangeHandler}
            placeholder="Enter credit card number..."
          />
          <input
            type="text"
            name="expiration"
            value={expiration}
            onChange={this.onChangeHandler}
            placeholder="Exp: MO/YR"
          />
          <input
            type="text"
            name="cvv"
            value={cvv}
            onChange={this.onChangeHandler}
            placeholder="CVV"
          />

          <label>Billing Zip Code</label>
          <input
            type="text"
            name="zip"
            value={zip}
            onChange={this.onChangeHandler}
            placeholder="Zip Code"
          />
          
          <button>Next</button>

        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      view: "index"
    }
    this.toSignUpView = this.toSignUpView.bind(this);
    this.toShippingView = this.toShippingView.bind(this);
    this.toBillingView = this.toBillingView.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
  }

  toSignUpView(event) {
    this.setState({ view: "sign-up"})
  }

  toShippingView(event) {
    this.setState({ view: "shipping" })
  }

  toBillingView(event) {
    this.setState({ view: "billing" })
  }

  completeOrder(event) {
    this.setState({ view: "index" })
  }

  submitData(data, path) {
    console.log(`Submit ${JSON.stringify(data)} to ${path}`);
    axios.get(path, data);
  }

  renderView() {
    let { view } = this.state;

    if (view === "index") {
      return (
        <button onClick={this.toSignUpView} >Checkout</button>
      )
    } else if (view === "sign-up") {
      return (
        <SignUpView 
        toNext={this.toShippingView} 
        submitData={this.submitData} 
        />
      )
    } else if (view === "shipping") {
      return (
        <ShippingView 
        toNext={this.toBillingView} 
        submitData={this.submitData} 
        />
      )
    } else if (view === "billing") {
      return (
        <BillingView 
        toNext={this.completeOrder} 
        submitData={this.submitData} 
        />
      )
    }
  }

  render () {
    return this.renderView();
  }
};

ReactDOM.render(<App />, document.getElementById("app"));