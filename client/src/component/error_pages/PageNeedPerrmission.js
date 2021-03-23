import { Result } from "antd";

import React from "react";

export default function PageNeedPerrmission() {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
    </div>
  );
}
