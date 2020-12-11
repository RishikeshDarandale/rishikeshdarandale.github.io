import { Icon } from 'reflexjs';

export default function Home(): JSX.Element {
  return (
    <div>
      <section pt="6|8|12|20">
        <div variant="container">
          <div
            display="flex"
            flexDirection="column"
            textAlign="center"
            justifyContent="center"
          >
            <p color="primary" textTransform="uppercase" m="0">
              Hey, I'm
            </p>
            <h1 
              variant="heading.h1"
              fontWeight="bolder" 
              lineHeight="tight">
              Rishikesh Darandale
            </h1>
            <div
              display="flex"
              alignItems="center"
              justifyContent="center"
              size="80"
              rounded="full"
              mb="4"
              mx="auto"
              bg="secondary"
            >
              <img 
                rounded="full"
                src="https://s.gravatar.com/avatar/5d0385085f0116785d4a9dde15acc67d?s=300"
                alt="Rishikesh Darandale"/>
            </div>
            <p variant="text.lead" mt="2" borderBottomWidth={1}>
              Full Stack Developer | Technical Architect | Quick Learner
            </p>
            <p mt="8" >
              I am full stack developer with more than 15 years of development experience. I am passinate about code hygine, design, user interface and security. Currently I am focusing and learning more about the serverless world. 
            </p>
            <div display="flex" justifyContent="center" gap="4" mt="6">
              <a variant="button.primary.lg" href="#">
                About <Icon name="arrow-right" ml="2" size="4" />
              </a>
              <a variant="button.outlineSecondary.lg" href="#">
                Projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}