const LocationsBreadcrumb = ({
  singleLocation,
  title2 = singleLocation?.name,
  title1,
}) => {
  // Determine the URL based on `title1`
  const getHref = (title) => {
    switch (title.toLowerCase()) {
      case "locations":
        return "/#/locations";
      case "tenants":
        return "/#/tenants";
      default:
        return window.location.pathname; // Stay on the current page
    }
  };

  return (
    <>
      <ul className="flex items-center">
        <li className="inline-flex items-center">
          <a
            href={getHref(title1)} // Dynamically set the href
            className="text-[#898989] hover:text-custom-green text-sm"
          >
            {title1}
          </a>
          <span className="mx-1.5 h-auto text-[#898989] font-medium">/</span>
        </li>
        <li className="inline-flex items-center cursor-default">
          <a className="text-custom-green text-sm">
            {title2}
          </a>
        </li>
      </ul>
    </>
  );
};

export default LocationsBreadcrumb;
