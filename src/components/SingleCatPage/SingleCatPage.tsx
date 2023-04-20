import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCatContext } from '../../context/CatContext';
import { Cat } from '../../types/Cat';

const SingleCatPage = () => {
  const { cats } = useCatContext();
  const {id} = useParams();
  const selectedCat: Cat | undefined = cats.find((cat) => cat.id === id);

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2;
    const emptyStars = 5 - fullStars - halfStars;
    const starArray = [];
  
    for (let i = 0; i < fullStars; i++) {
      starArray.push(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      );
    }
  
    if (halfStars) {
      starArray.push(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
        <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
      </svg>);
    }
  
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(<i key={i + fullStars + halfStars} className="bi bi-star"></i>);
    }
  
    return starArray;
  };
  
  

  return (
    <>
        {selectedCat ? (<Container className="mt-5">
        <Row>
            <Col md={6}>
                <Image src={selectedCat.url} alt={selectedCat.breeds[0].name} fluid />
            </Col>
            <Col md={6}>
            <h2>{selectedCat.breeds[0].name}</h2>
            <p>{selectedCat.breeds[0].description}</p>
                <Row>
                    <div className='d-flex justify-content-between'>
                        <p>Affection Level</p>
                        <span>{renderStarRating(selectedCat.breeds[0].affection_level)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Adaptability</p>
                        <span>{renderStarRating(selectedCat.breeds[0].adaptability)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Child Friendly</p>
                        <span>{renderStarRating(selectedCat.breeds[0].child_friendly)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Stranger Friendly</p>
                        <span>{renderStarRating(selectedCat.breeds[0].stranger_friendly)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Grooming</p>
                        <span> {renderStarRating(selectedCat.breeds[0].grooming)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Health Issues</p>
                        <span>{renderStarRating(selectedCat.breeds[0].health_issues)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Intelligence</p>
                        <span>{renderStarRating(selectedCat.breeds[0].intelligence)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Social Needs</p>
                        <span> {renderStarRating(selectedCat.breeds[0].social_needs)}</span>
                    </div>
                </Row>
            </Col>
        </Row>
        </Container>) : <p>Loading...</p>}
    </>
  );
};

export default SingleCatPage;
