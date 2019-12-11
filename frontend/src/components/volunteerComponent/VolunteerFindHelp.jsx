/* eslint-disable object-shorthand */
/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Row,
  Col,
  Tab,
} from 'react-bootstrap';

import PaginationBasic from './PaginationBasic';
import VolunteerFindListRefugees from './VolunteerFindListRefugees'
import API_URL from '../../api';
import loading from '../../assets/images/load.gif';

const PaginationValue = 7;

const VolunteerFindHelp = () => {
  const [refugeesInfo, setRefugeesInfo] = useState({ data: [], status: 'initialize' });
  const [refugeesInfoFilter, setRefugeesInfoFilter] = useState([]);
  const [pagination, setPagination] = useState(1);

  const orderArray = (array) => array.sort((a1, b1) => {
    let a = a1; let b = b1;
    a = new Date(a.registeredDate);
    b = new Date(b.registeredDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const changeDataRefugeebyCategory = (e) => {
    e.preventDefault();
    const category = e.target.value;
    if (category === 'All') {
      setRefugeesInfoFilter(orderArray(refugeesInfo.data));
    } else {
      const filterArray = refugeesInfo.data.filter((element) => element.help.indexOf(category) >= 0);
      setRefugeesInfoFilter(orderArray(filterArray));
      setPagination(1);
    }
  }

  if (refugeesInfo.status === 'initialize') {
    axios.get(`${API_URL()}/refugee`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setRefugeesInfo({ data: result.data, status: 'loaded' })
        setRefugeesInfoFilter(orderArray(result.data));
      })
  }
  if (refugeesInfo.status === 'loaded') {
    return (
      <Container className="mb-4 pt-4">
        <Tab.Container>
          <Row>
            <Col sm={10}>
              <h2> Directory of Refugees:  </h2>
              <br />
            </Col>
          </Row>
        </Tab.Container>
        <Tab.Container>
          <Row>
            <Col sm={4}>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridHelp">
                    <Form.Label>Filter by Category:</Form.Label>
                    <Form.Control as="select" name="help" onChange={changeDataRefugeebyCategory}>
                      <option>All</option>
                      <option>shelter</option>
                      <option>healthcare</option>
                      <option>education</option>
                      <option>legal advice</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Tab.Container>
        <VolunteerFindListRefugees PaginationValue={PaginationValue} pagination={pagination} refugeesInfoFilter={refugeesInfoFilter} />
        <Tab.Container>
          <Row>
            <Col sm={10}>
              <br />
              <PaginationBasic totalPagination={refugeesInfoFilter.length} setPagination={setPagination} PaginationValue={PaginationValue} pagination={pagination} />
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    )
  }
  return (
    <Container className="mb-8 pt-8">
      <img src={loading} alt="loadin" />
    </Container>
  )
}

export default VolunteerFindHelp;
