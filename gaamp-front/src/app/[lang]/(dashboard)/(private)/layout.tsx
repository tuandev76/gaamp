// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'

// Layout Imports
import HorizontalLayout from '@layouts/HorizontalLayout'
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import AuthGuard from '@/hocs/AuthGuard'
import Providers from '@components/Providers'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import Header from '@components/layout/horizontal/Header'
import VerticalFooter from '@components/layout/vertical/Footer'
import Navbar from '@components/layout/vertical/Navbar'
import Navigation from '@components/layout/vertical/Navigation'
import ScrollToTop from '@core/components/scroll-to-top'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getDictionary } from '@/utils/getDictionary'
import { getMode, getSystemMode } from '@core/utils/serverHelpers'

const Layout = async (props: ChildrenType & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params

  const { children } = props

  // Vars
  const direction = i18n.langDirection[params.lang]
  const dictionary = await getDictionary(params.lang)
  const mode = await getMode()
  const systemMode = await getSystemMode()

  return (
    <Providers direction={direction}>
      <AuthGuard locale={params.lang}>
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <VerticalLayout
              navigation={<Navigation dictionary={dictionary} mode={mode} />}
              navbar={<Navbar />}
              footer={<VerticalFooter />}
            >
              {children}
            </VerticalLayout>
          }
          horizontalLayout={
            <HorizontalLayout header={<Header dictionary={dictionary} />} footer={<HorizontalFooter />}>
              {children}
            </HorizontalLayout>
          }
        />
        <ScrollToTop className='mui-fixed'>
          <Button
            variant='contained'
            className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
          >
            <i className='ri-arrow-up-line' />
          </Button>
        </ScrollToTop>
      </AuthGuard>
    </Providers>
  )
}

export default Layout
