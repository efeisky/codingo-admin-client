import { Routes, Route} from "react-router-dom";
import { routes} from "./routes/routes";
import HomePage from "./pages/home/home_page";
import LoginPage from "./pages/login/login_page";
import Default from "./pages/Default";
import { Layout } from "./pages/Layout";
import VerifyLogin from "./pages/verify_login/VerifyLogin";
import ProfileReports from "./pages/profile_reports/profile_reports";
import ProfileDetailReport from "./pages/profile_reports/detail_report/profile_detail_report";
import ContactReports from "./pages/contact_reports/contact_reports";
import ContactDetailReport from "./pages/contact_reports/detail_report/contact_detail_report";
import SetQuestion from "./pages/lesson/set_question/set_question";
import QuestionSetByID from "./pages/lesson/set_question/question_set_id/question_set_by_id";
import SettingPage from "./pages/setting/setting_page";

function App() {
  document.title = 'Admin Yönetim Paneli'
  return (
    <Routes>
      <Route path={routes.default_path.path} element={<Default />} />

      <Route path={routes.login.path} element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path={routes.verify.path} element={<VerifyLogin />} />
      </Route>


      <Route path={routes.homepage.path} element={<HomePage />} />

      <Route path={routes.reports.path} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.contact_reports.path} element={<Layout />}>
          <Route index element={<ContactReports />} />
          <Route path={':id'} element={<ContactDetailReport/>} />
        </Route>
        <Route path={routes.profile_reports.path} element={<Layout />}>
          <Route index element={<ProfileReports />} />
          <Route path={':id'} element={<ProfileDetailReport />} />
        </Route>
      </Route>
      
      <Route path={routes.lessons.path} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.set_question.path} element={<Layout />}>
          <Route index element={<SetQuestion />} />
          <Route path={':id'} element={<QuestionSetByID/>} />
        </Route>
      </Route>
      
      <Route path={routes.setting.path} element={<SettingPage />} />
    </Routes>
  );
}

export default App;
