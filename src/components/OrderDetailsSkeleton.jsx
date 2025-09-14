function OrderDetailsSkeleton() {
  return (
    <section className="summary skeleton">
      <div className="summary-header">
        <div className="skeleton-box circle" style={{width: '24px', height: '24px'}} />
        <div className="skeleton-box skeleton-text title"></div>
      </div>

      <div className="order-items">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="order-item">
            <div className="item-info">
              <div className="skeleton-box skeleton-text name"></div>
              <div className="skeleton-box skeleton-text price"></div>
            </div>
            <div className="skeleton-box circle" style={{width: '28px', height: '28px'}}></div>
          </div>
        ))}
      </div>

      <div className="order-total">
        <span className="skeleton-box skeleton-text total-label"></span>
        <span className="skeleton-box skeleton-text total-price"></span>
      </div>

      <div className="skeleton-box skeleton-text checkout-btn"></div>
    </section>
  );
}

export default OrderDetailsSkeleton;