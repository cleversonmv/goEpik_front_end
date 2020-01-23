import React, { useEffect, useState } from 'react';
import { withRouter, Link, Route } from 'react-router-dom';
import './style.scss';
import { Input, Divider, Card, Icon, Pagination, Tooltip, Empty } from 'antd';
import { connect } from 'react-redux';
import Details from '../details';
import { genderIcon } from '../../components/utils';
import { getChars } from '../../configs/query';
import { ApolloConsumer } from "react-apollo";

const { Search } = Input;
// const {innerWidth} = window;

const Characters = withRouter(({ charsStore,nextLink,previousLink,countPage, history, match }) => {
  const [chars, setChars] = useState([]);
  const [noResults, setNoResults] = useState(false);


  useEffect(() => {
    if (charsStore !== undefined) setChars(charsStore)
  }, [charsStore])

  function onSearch(value) {
    if (value) {
      let filtered = charsStore.filter(char => char.name.toLowerCase().includes(value.target.value)
        || char.gender === value.target.value
        || char.birth_year.includes(value.target.value));
      setChars(filtered)
      setNoResults(filtered.length ? false : true)
    } else {
      setChars(charsStore);
      setNoResults(false);
    }
  }

  return (
    <>
      <div className='charsContainer'>

        <Divider className='charsDivider' />
        <span className='charsTitle'>STAR WARS : CHARACTERS //</span>
        <Divider className='charsDivider' />
        <div>
          <Search
            placeholder="search by name, gender or birth year "
            onChange={onSearch}
          />
        </div>
        <div className='charsCardsContainer'>
          {chars.map((char, i) => (
            <Card
              key={i}
              hoverable
              onClick={() => history.push('/charDetails', char)}
              className='cards'
            >
              <div className='charDescription'>
                <span className='charName'>{char.name.toUpperCase()}</span>
                {<Tooltip title='Gender'><Icon type={genderIcon(char.gender)} /></Tooltip>}
              </div>
              <Tooltip title='Films'><span>
                {char.films.map((f, i) => <Icon key={i} type="star" theme="filled" />)}
              </span></Tooltip>

            </Card>
          )
          )}
          {chars.length == 0 && !noResults && <div className='noData'><Icon type="loading" /></div>}
          {chars.length == 0 && noResults && <div className='noData'><Icon type="frown"/><span>No search results!</span></div>}
        </div>
        {chars.length > 0 &&
          <ApolloConsumer>
          {client => (
            <Pagination
            total={countPage}
            onChange={(page) => getChars(client,`page=${page}`)}
          />            
          )
        }
        </ApolloConsumer>
        }
    </div>
    <Route path={`/charDetails`}><Details /></Route>
    </>
  )
})


const mapStateToProps = (state) => {
  return {
    charsStore: state.chars.results,
    nextLink:state.chars.next,
    previousLink:state.chars.previous,
    countPage:state.chars.count
  }
}

export default connect(mapStateToProps, null)(Characters)