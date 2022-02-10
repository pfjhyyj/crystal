import ProForm from '@ant-design/pro-form';
import type { NextPage } from 'next';


const Login: NextPage = () => {
  return (
    <div className="wrapper flex-1 justify-center">
      <div className="box max-w-md">
        <ProForm />
      </div>
    </div>
  );
};

export default Login;
