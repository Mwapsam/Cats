import { useCatContext } from '../../context/CatContext';
import { Card } from 'react-bootstrap';

type Props = {
    cats: any[]
}

const BreedInfo = ({cats}: Props ) => {
  const { selectedBreed } = useCatContext();
  const selectedCat = cats.find((cat) => cat.breeds[0].id === selectedBreed);

  if (!selectedCat) {
    return null;
  }

  return (
    <Card>
      <Card.Header>{selectedBreed}</Card.Header>
      <Card.Body>
        <Card.Title>{selectedCat.breeds[0].name}</Card.Title>
        <Card.Text>{selectedCat.breeds[0].description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BreedInfo;
