import PropertyCard from './PropertyCard.jsx';

export default function PropertyGrid({ properties }) {
  return (
    <>


      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
}
