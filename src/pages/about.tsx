import BIO from '../assets/data/bio.yml';
import { Card } from '../components/common/Card';

export default function Home(): JSX.Element {
  return (
    <div>
      <section py="4|6|12|20">
        <div variant="container">
          <div>
            <h2 variant="heading.h1" lineHeight="1">
              Professional Experience
            </h2>
          </div>
          <div display="grid" col="1" gap="4|8" my="8|12">
          {BIO.professionalExperience.map((company, index) => (
            <Card 
              key={index}
              heading={company.companyName}
              text={company.details.workDescription}
              image={{
                src: "",
                alt: ""
              }} />
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}
