import { Link } from 'react-router-dom';
import FormField from '@/components/FormField/FormField';
import useLoginPage from './LoginPageHook';
import { SIGN_UP_ROUTE } from '@/configs/path-consts'; 
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useResponsive } from '@/hooks/useResponsive';
import { calculateSizes } from '@/configs/helper';
import { CanvasLoader, Cube, HackerRoom, HeroCamera, ReactLogo, Rings, Target } from '@/configs/lazy-load';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLoginPage();
  const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();

  const sizes = calculateSizes(isMobile, isTablet);

  return (
    <section className="bg-accent-light-600 dark:bg-accent-dark-400 grid grid-cols-1 lg:grid-cols-2 w-screen h-screen p-4 gap-4 overflow-scroll font-archivo">
      <Helmet>
        <title>Login Page</title>
        <meta name="description" content="Welcome to the Login Page" />
      </Helmet>
      <Canvas className="w-full h-full hidden lg:flex rounded-2xl">
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />
          <HeroCamera isMobile={isMobile}>
            <HackerRoom
              scale={sizes.deskScale}
              position={sizes.deskPosition}
              rotation={[0, -Math.PI, 0]}
            />
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
            </group>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </HeroCamera>
        </Suspense>
      </Canvas>
      <div className="w-full h-fit flex flex-col items-center self-center gap-2">
        <div className="w-3/4 grid gap-6">
          <div className="grid text-center">
            <h2 className="text-h4 font-bold text-text-light-600 dark:text-text-dark-600">
              {t('login.mainTitle')} <span className="waving-hand">👋</span>
            </h2>
            <p className="text-body4 text-text-dark-400">
              {t('login.subTitle')}
            </p>
          </div>

          <form className="grid gap-4 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField
              type="email"
              placeholder={t('form.email.placeholder')}
              name="email"
              register={register}
              error={errors.email}
              label={t('form.email.label')}
            />
            <FormField
              type="password"
              placeholder={t('form.password.placeholder')}
              name="password"
              register={register}
              error={errors.password}
              label={t('form.password.label')}
            />
            <button
              className="font-semibold w-full mt-4 bg-primary-light-500 py-3 px-6 rounded-lg text-text-dark-600 hover:brightness-90 text-body4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('form.submitting') : t('form.submit')}
            </button>
          </form>
          <span className="text-body4 text-text-light-600 dark:text-text-dark-500 text-center">
            {t('login.dontHaveAccount')}{' '}
            <Link to={SIGN_UP_ROUTE} className="text-primary-light-500 underline underline-offset-2">
              {t('login.signUp')}
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
