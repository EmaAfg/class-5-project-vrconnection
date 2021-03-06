import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import organizationData from '../data/organizationData';

const OrganizationsComponent = () => (
  <>
    <center style={{ marginTop: '5%' }}>
      <h1>
        Organizations that help refugees in Belgium
      </h1>
    </center>
    <CardDeck style={{ padding: '1%', marginLeft: '3%', marginRight: '3%' }}>
      {organizationData.map((organization) => (
        <Card bg="light" key={organization.name} border="primary">
          <Card.Img className="logo rounded mx-auto d-block" src={organization.logo} style={{ width: '50%' }} />
          <Card.Body>
            <Card.Title className="text-center">{organization.name}</Card.Title>
            <Card.Text>{organization.description}</Card.Text>
            <a href={organization.url} className="btn btn-info" role="button" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </Card.Body>
          <Card.Footer>
            <span className="fas fa-map-marker-alt m-1">{organization.address}</span>
            <hr />
            <span className="fas fa-phone">{organization.contactNumber}</span>
            <hr />
            <span className="fas fa-envelope">{organization.email}</span>
          </Card.Footer>
        </Card>
      ))}
    </CardDeck>
  </>
)

export default OrganizationsComponent;
