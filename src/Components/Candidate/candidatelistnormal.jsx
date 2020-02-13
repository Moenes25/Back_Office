/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import {
  Table, Icon, Button, Checkbox,
} from 'semantic-ui-react';
import GET_ALL_CANDIDATE from '../../Graphql/Query/Candidate/Querylistcandidatenormal';

class CandidateListNormal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{ width: '56%', marginLeft: '23%' }}>
        <Query query={GET_ALL_CANDIDATE}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) {
                return (
                  <h4>
                      Error `$
                    {error}
                  </h4>
                );
              }
              const candidate = (data.candidatesByType);

              return (
                <Table>
                  <Table.Header>
                    <Table.Row align="center">
                      <Table.HeaderCell><Checkbox label="firstName" value="firstName" /></Table.HeaderCell>
                      <Table.HeaderCell><Checkbox label="lastName" value="lastName" /></Table.HeaderCell>
                      <Table.HeaderCell><Checkbox label=" createdAt" value=" createdAt" /></Table.HeaderCell>
                      <Table.HeaderCell>Cv</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {candidate.map((candidate) => (
                      <Table.Row align="center">
                        <Table.Cell>{candidate.firstName}</Table.Cell>
                        <Table.Cell>{candidate.lastName}</Table.Cell>
                        <Table.Cell>{moment(candidate.createdAt).format('YYYY/MM/DD')}</Table.Cell>
                        <Table.Cell>
                          <Button size="small" color="green" type="file">
                            <Icon name="download" />
                          </Button>

                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              );
            }
          }
        </Query>
      </div>
    );
  }
}
export default CandidateListNormal;
