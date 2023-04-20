import styled from 'styled-components';
import { Card, Spinner, Button,  Container, Alert, Col } from 'react-bootstrap';
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

const StyledContainer = styled(Container)`
  max-width: 1200px;
`;


type Props = {}

const HomePage = (props: Props) => {
  const { cats, isLoading, error, loadMoreCats } = useCatContext();  

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
                <div className="w-100 w-md-30 p-3">
                    <BreedInfo cats={cats} />
                </div>
              <div className='d-flex flex-wrap'>
              <CardWrapper>
                    {cats.map((cat) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={cat.id}>
                        <StyledCard>
                            <StyledImage variant="top" src={cat.url} />
                            <Link to={`/cat/${cat.id}`}>
                            <Button variant="secondary" style={{ width: "100%", borderRadius: 0 }}>
                                View Details
                            </Button>
                            </Link>
                        </StyledCard>
                        </Col>
                    ))}
                </CardWrapper>

                {cats.length !== 0 && (
                    <div className="text-center m-4 w-100">
                        <Button onClick={loadMoreCats}>Load More</Button>
                    </div>
                )}
              </div>

            </div>
          </>)}
    </Container>
  );
};

export default HomePage;
