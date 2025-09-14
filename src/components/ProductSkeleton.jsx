function ProductSkeleton() {
  return (
    <div className="product skeleton">
      <div className="product-badge">
        <div className="skeleton-box" style={{width: '60px', height: '20px', borderRadius: '4px'}}></div>
      </div>
      <div className="photo skeleton-box" />
      <div className="description">
        <div className="skeleton-box skeleton-text name" />
        <div className="skeleton-box skeleton-text price" />
        <div className="skeleton-quantity">
          <div className="skeleton-box circle" />
          <div className="skeleton-box" style={{width: '30px', height: '20px', borderRadius: '4px'}} />
          <div className="skeleton-box circle" />
        </div>
        <div className="skeleton-box" style={{width: '100%', height: '36px', borderRadius: '6px', marginTop: '8px'}} />
      </div>
    </div>
  );
}

export default ProductSkeleton;