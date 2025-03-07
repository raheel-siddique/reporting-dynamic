const TenantBreadcrumb = ({
    singleTenant,
    title2 = singleTenant?.name,
    title1 = "Tenants",
  }) => {
    return (
      <>
        <ul className="flex items-center">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="text-[#898989] hover:text-custom-green text-sm"
            >
              {title1}
            </a>
            <span className="mx-1.5 h-auto text-[#898989] font-medium">/</span>
          </li>
          <li className="inline-flex items-center">
            <a href="#" className="text-custom-green text-sm">
              {title2}
            </a>
          </li>
        </ul>
      </>
    );
  };
  
  export default TenantBreadcrumb;
  