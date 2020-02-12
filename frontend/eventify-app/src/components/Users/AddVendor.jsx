import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class AddVendor extends Component {
  state = {
    validated: false,
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone_num: "",
    vendor_type: "",
    vendor_desc: "",
    rfid_reader_id: "",
    auth: false,
    successModal: false
  };

  onRegister = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ validated: true });
      return;
    }
    e.preventDefault();

    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      company_name: this.state.company_name,
      email: this.state.email,
      phone_num: this.state.phone_num,
      vendor_type: this.state.vendor_type,
      vendor_desc: this.state.vendor_desc,
      rfid_reader_id: this.state.rfid_reader_id,
      organizer_id: sessionStorage.getItem("email")
    };
    axios.post("http://localhost:5000/addVendor", data).then(response => {
      console.log(response.data.message);
      if (response.data.message === "Vendor added successfully") {
        this.setState({ successModal: true });
        this.resetForm();
        this.props.onModify();
      }
    });
    this.setState({ validated: false });
  };

  successClose = () => {
    this.setState({ successModal: false });
  };

  resetForm() {
    this.setState({
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      phone_num: "",
      vendor_type: "",
      vendor_desc: "",
      rfid_reader_id: ""
    });
  }

  changeRadio(e) {
    this.setState({ vendor_type: e.target.value });
  }

  render() {
    const CustomInput = ({ value, onClick }) => (
      <input
        type="text"
        className="form-control"
        onClick={onClick}
        value={value}
      />
    );

    let radios = ["Speaker", "Stall"].map((key, index) => {
      return (
        <Form.Check
          custom
          type="radio"
          id={`custom-radio-` + index}
          label={key}
          name="vendortype"
          value={key}
          key={key}
          onClick={e => this.changeRadio(e)}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="tab-content">
          <div className="tab-header">
            <h1 className="header">Add Vendor</h1>
            <div class="border-div"></div>
            <p>
              Here you can add a new vendor and specify details about the same.
            </p>
          </div>
          <div className="tab-body">
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={e => this.onRegister(e)}
            >
              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  First name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    value={this.state.first_name}
                    onChange={e =>
                      this.setState({ first_name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter first name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Last name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    value={this.state.last_name}
                    onChange={e => this.setState({ last_name: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter last name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Company name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Company name"
                    value={this.state.company_name}
                    onChange={e =>
                      this.setState({ company_name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter company name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Email Address
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter email address.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Phone Number
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Phone Number"
                    value={this.state.phone_num}
                    onChange={e => this.setState({ phone_num: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter phone number
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Vendor Type
                </Form.Label>

                <Col sm={8}>
                  {radios}
                  <Form.Control.Feedback type="invalid">
                    Please enter vendor type
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Vendor Description
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Vendor Description"
                    rows="3"
                    value={this.state.vendor_desc}
                    onChange={e =>
                      this.setState({ vendor_desc: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Vendor Description
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  RFID Reader ID
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="number"
                    placeholder="RFID Reader ID"
                    value={this.state.rfid_reader_id}
                    onChange={e =>
                      this.setState({ rfid_reader_id: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter RFID Reader ID
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Button type="submit">Add Vendor</Button>
            </Form>
          </div>
        </div>
        <Modal
          className="confirm-modal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.successModal}
          onHide={this.successClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Success!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Vendor added successfully!</h5>
            <Button onClick={this.successClose} size="sm" variant="success">
              Ok
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddVendor;
