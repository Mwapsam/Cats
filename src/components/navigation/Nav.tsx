import { Container, Navbar } from 'react-bootstrap';


const Nav = () => {
  return (
    <>
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">CatsLand</Navbar.Brand>
            </Container>
        </Navbar>
    </>
  )
}

export default Nav