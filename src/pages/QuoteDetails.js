import React, {useEffect} from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from '../components/UI/LoadingSpinner';


const QuoteDetails = () => {
  const match = useRouteMatch();
  const prams = useParams();
  const { sendRequest, status, data: loadedQuote, error  } = useHttp(getSingleQuote, true);

  const { quoteId } = prams;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])


  if (status === 'pending') {
    return <div className='centered'>
      <LoadingSpinner/>
    </div>
  }
  
  if (error) {
    return <p className='centered'>{ error }</p>
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>
  }


  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className="centered">
        <Route path={`${match.path}`} exact>
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </Route>
        </div>
        <Route path={`${match.path}/comments`}>
          <Comments/>
        </Route>
    </>
  )
}
export default QuoteDetails;