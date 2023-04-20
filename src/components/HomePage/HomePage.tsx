import styled from 'styled-components';
import { Card, Spinner, Button,  Container, Alert, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCatContext } from '../../context/CatContext';
import BreedSelect from './BreedSelect';
import BreedInfo from './BreedInfo';

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: evenly;
  gap: 3rem;
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

const StyledContainer = styled(Row)`
  @media (max-width: 768px) {
    .mt-5 {
      margin-top: 0;
    }
    .card {
      margin-bottom: 1.5rem;
    }
    .card-img-top {
      height: auto;
    }
    .card-body {
      padding: 1.25rem;
    }
    .card-title {
      font-size: 1.5rem;
    }
  }
`;


type Props = {}

const HomePage = (props: Props) => {
  const { cats, isLoading, error, loadMoreCats, defaultImage } = useCatContext();  

  return (
    <Container>
        {error && <Alert variant='danger'>{error.message}</Alert>}
        {isLoading ? 
            (
            <SpinnerContainer>
                <Spinner animation="border" variant="primary" />
            </SpinnerContainer>
            )  : (<>
            {cats.length !== 0 && <BreedSelect />}
            <>
              {defaultImage && cats.length === 0 && (
                <Row className="mt-5">
                  <Col sm={12} md={6} order={{sm: 2, md: 1}}>
                    <Card style={{ width: "100%", height: '30rem', border: 'none' }}>
                      <Card.Img src={defaultImage} alt="default cat" style={{ height: "100%" }}  />
                    </Card>
                  </Col>
                  <Col sm={12} md={6} order={{sm: 1, md: 2}}>
                    <Card style={{ width: "100%", height: '30rem', border: 'none' }}>
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">Please Select the breed you would like to see below.</Card.Subtitle>
                        <BreedSelect />
                        <Card.Title className="mt-3">About Us</Card.Title>
                        <Card.Text>
                          Our cat website is a platform where cat lovers can come together to learn, share, and connect with others who share their passion for felines. We offer a variety of resources such as articles, videos, and forums on topics ranging from cat health and nutrition to behavior and training. Our website also features a directory of cat breeds, as well as a gallery of cute and funny cat photos and videos. Whether you're a seasoned cat owner or just considering adding a feline friend to your household, our website has something for everyone.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </>

            <Row className='my-5'>
                <Col sm={12} md={3}>
                    <BreedInfo cats={cats} />
                </Col>
              <Col md={9}>
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
                    <div className="mx-auto m-4 w-100">
                        <Button onClick={loadMoreCats}>Load More</Button>
                    </div>
                )}
              </Col>
            </Row>
          </>)}
    </Container>
  );
};

export default HomePage;
