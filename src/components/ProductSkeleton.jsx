function ProductSkeleton() {
  return (
    <div className="product skeleton">
      <div className="photo skeleton-box" />
      <div className="description">
        <div className="skeleton-box skeleton-text name" />
        <div className="skeleton-box skeleton-text price" />
        <div className="skeleton-quantity">
          <div className="skeleton-box circle" />
          <div className="skeleton-box circle" />
          <div className="skeleton-box circle" />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;

