// ** Imports do React
import React from "react";

// ** Imports de pacotes
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// ** Imports de estilos
import styles from "./Login.module.css";

// ** Imports de componentes
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

// ** Imports de serviços
import { LoginData, login as loginService } from "../../services/authService";

// ** Imports de contextos
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const onSubmit = async (values: LoginData) => {
    try {
      const user = await loginService(values);
      login(user);
      navigate("/");
    } catch (error) {
      alert("Erro ao realizar login");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <>
            <Title>MEU SITE PESSOAL</Title>

            <Input
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              touched={touched.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              errors={errors.password}
              touched={touched.password}
            />

            <Button type="submit">Entrar</Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default Login;
