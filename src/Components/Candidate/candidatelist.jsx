import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Table, Icon, Button, Checkbox,
} from 'semantic-ui-react';
import { sortBy } from 'lodash';
import GET_ALL_CANDIDATE from '../../Graphql/Query/Querylistcandidate';

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sort: '',
    };
  }

  openClose = () => { const { open } = this.state; this.setState({ open: !open }); }


  sortByChange = (event, { value }) => {
    this.setState({ sort: value });
  }


  render() {
    const { sort } = this.state;
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
              const candidate = sortBy(data.candidatesByType, sort, 'desc');

              return (
                <Table>
                  <Table.Header>
                    <Table.Row align="center">
                      <Table.HeaderCell><Checkbox label="firstName" value="firstName" onChange={this.sortByChange} /></Table.HeaderCell>
                      <Table.HeaderCell><Checkbox label="lastName" value="lastName" onChange={this.sortByChange} /></Table.HeaderCell>
                      <Table.HeaderCell><Checkbox label="yearExperience" value="yearExperience" onChange={this.sortByChange} /></Table.HeaderCell>
                      <Table.HeaderCell>OldPost</Table.HeaderCell>

                      <Table.HeaderCell>Cv</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {candidate.map((candidate) => (
                      <Table.Row align="center">
                        <Table.Cell>{candidate.firstName}</Table.Cell>
                        <Table.Cell>{candidate.lastName}</Table.Cell>
                        <Table.Cell>{candidate.yearExperience}</Table.Cell>
                        <Table.Cell>{candidate.oldPost}</Table.Cell>
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
export default CandidateList;
