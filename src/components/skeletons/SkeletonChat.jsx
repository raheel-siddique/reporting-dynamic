export const SkeletonChat = () => {
  return (
    <div className="skeleton-container">
      {/* Skeleton heading */}
      <div className="skeleton skeleton-heading"></div>

      {/* Skeleton lines */}
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
      <div className="skeleton skeleton-line"></div>
    </div>
  );
};
