import styled from 'styled-components';
import { Card, Spinner, Button,  Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCatContext } from '../../context/CatContext';
import BreedSelect from './BreedSelect';
import BreedInfo from './BreedInfo';

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;
const StyledCard = styled(Card)`
  width: 20rem;
  overflow: hidden;
  height: 16.5rem;
`;

const StyledImage = styled(Card.Img)`
    height: 14rem;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

type Props = {}

const HomePage = (props: Props) => {
  const { cats, isLoading, error, loadMoreCats } = useCatContext();
  console.log(cats);
  

  return (
    <Container>
        {error && <Alert variant='danger'>{error.message}</Alert>}
        {isLoading ? 
            (
            <SpinnerContainer>
                <Spinner animation="border" variant="primary" />
            </SpinnerContainer>
            )  : (<>
            <BreedSelect />
            <div className="d-flex mt-5">
              <div className="w-30 p-3">
                  <BreedInfo cats={cats} />
              </div>
              <div className='d-flex flex-column'>
                <CardWrapper>
                    {cats.map((cat) => (
                        <StyledCard key={cat.id}>
                            <StyledImage variant="top" src={cat.url} />
                            <Link to={`/cat/${cat.id}`}>
                                <Button variant="secondary" style={{width: '100%', borderRadius: 0}}>View Details</Button>
                            </Link>
                        </StyledCard>
                    ))}
                </CardWrapper>
                {cats.length !== 0 && <div className='text-center m-4'>
                    <Button onClick={loadMoreCats}>Load More</Button> 
                </div>}
              </div>

            </div>
          </>)}
    </Container>
  );
};

export default HomePage;
