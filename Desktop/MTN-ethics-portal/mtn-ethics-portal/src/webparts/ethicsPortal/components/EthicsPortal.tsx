import * as React from "react";
import * as jQuery from "jquery";
import { IEthicsPortalProps } from "./IEthicsPortalProps";
import { ThemeProvider } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { theme } from "./themes/themes";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { CreateQuizPage } from "./modules/admin/pages/quiz/CreateQuizPage";
import { NotFound } from "./notFound/NotFound";
import { LandingPage } from "./modules/employee/pages/landing-page/LandingPage";
import { PhotoCategories } from "./modules/employee/pages/gallery/photo-categories/PhotoCategories";
import { VideoGallery } from "./modules/employee/pages/gallery/VideoGallery";
import "./styles.css";
import { Post } from "./modules/employee/components/blog/Post";
import { QuizLandingPage } from "./modules/employee/pages/quiz/QuizLandingPage";
import { QuizPage } from "./modules/employee/pages/quiz/QuizPage";
import { QuizReviewPage } from "./modules/employee/pages/quiz/QuizReviewPage";
import { QuizContextProvider } from "./modules/employee/pages/quiz/context/QuizContext";
import { QuizResultPage } from "./modules/employee/pages/quiz/QuizResultPage";
import { useHistory } from "react-router-dom";
import { EthicsChampionLandingPage } from "./modules/employee/pages/recognition/champion-recognition/ethics-champions/EthicsChampionLandingPage";
import { EthicsChampionsActivties } from "./modules/employee/pages/recognition/champion-recognition/ethics-champion-activties/EthicsChampionsActivties";
import { EthicsTrainings } from "./modules/employee/pages/training/ethic-trainings/EthicsTrainings";
import { BusinessEthics } from "./modules/employee/pages/training/training-ethics-business/BusinessEthics";
import { MtnTrainingVideo } from "./modules/employee/pages/training/mtn-ethics-video/MtnTrainingVideo";
import { OrganizationEthics } from "./modules/employee/pages/training/organiztion-ethics/OrganizationEthics";
import { PolicyBreaches } from "./modules/employee/pages/policy-breaches/policybreaches-landingPage/PolicyBreaches";
import { EthicsDefaulters } from "./modules/employee/pages/policy-breaches/ethics-defaulters/EthicsDefaulters";
import { ArticlesLandingPage } from "./modules/employee/pages/ethics-articles/ethics-articles-page/ArticlesLandingPage";
import { LeadershipSeries } from "./modules/employee/pages/ethics-articles/ethics-leadership-series/LeadershipSeries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateAdminQuizContextProvider } from "./modules/admin/pages/quiz/context/AdminQuizContext";
import { CreateBlogPost } from "./modules/admin/pages/posts/CreateBlogPost";
import { ManageQuizPage } from "./modules/admin/pages/quiz/ManageQuizPage";
import { ContactUs } from "./modules/employee/pages/ethics-contact-us/contact-us/ContactUs";
import { QuickLinkPage } from "./modules/employee/pages/quick-links/QuickLinkPage";
import { CreateAdminPage } from "./modules/admin/pages/users/CreateAdminPage";
import { UpdateBlogPostPage } from "./modules/admin/pages/posts/UpdateBlogPostPage";
import { ManageBlogPostsPage } from "./modules/admin/pages/posts/ManageBlogPostsPage";
import { QuizReportPage } from "./modules/admin/pages/quiz/QuizReportPage";
import { AdminDashboard } from "./modules/admin/pages/dashboard/AdminDashboard";
import { ImageUploadPage } from "./modules/admin/pages/gallery/ImageUploadPage";
import { Gallery } from "./modules/admin/pages/gallery/Gallery";
import { VideoUploadPage } from "./modules/admin/pages/gallery/VideoUploadPage";
import { UpdateGalleryPage } from "./modules/admin/pages/gallery/UpdateGalleryPage";
import { ScrollingTextSetUpPage } from "./modules/admin/pages/scrolling-text/ScrollingTextSetUpPage";
import { VideoTrainingPage } from "./modules/admin/pages/training/VideoTrainingPage";
import { sp } from "@pnp/sp";
import { ManagePoliciesPage } from "./modules/admin/pages/policies/ManagePoliciesPage";
import { CreatePolicy } from "./modules/admin/pages/policies/CreatePolicy";
import { UpdatePolicyPage } from "./modules/admin/pages/policies/UpdatePolicyPage";
import { ViewEthicsTraining } from "./modules/employee/pages/training/ethic-trainings/view-ethics-trainings/ViewEthicsTraining";
import { PhotoGallery } from "./modules/employee/pages/gallery/PhotoGallery";
import { VideoCategories } from "./modules/employee/pages/gallery/VideoCategories";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { CreateRecognition } from "./modules/admin/pages/recognition/CreateRecognitionPage";
import { UpdateRecognitionPage } from "./modules/admin/pages/recognition/UpdateRecognitionPage";
import { ManageRecognitionPage } from "./modules/admin/pages/recognition/ManageRecognitionPage";
import { PolicyBreachesForm } from "./modules/admin/pages/policy-breaches/policy-breach-landingpage/policy-breach-form/PolicyBreachesForm";
import { AdminEthicsDefaulter } from "./modules/admin/pages/policy-breaches/ethics-defaulter/AdminEthicsDefaulter";
import { PolicyLandingComponent } from "./modules/employee/components/PolicyLandingComponent";
import { PolicyDetailPage } from "./modules/admin/pages/ethics-policies-management/pages/PolicyDetailPage";
import { ManageAdminPolicyPage } from "./modules/admin/pages/ethics-policies-management/pages/ManagePolicyPage";
import { WriteUpPage } from "./modules/employee/pages/ethics-policies/WriteUpPage";
import { PolicyPage } from "./modules/employee/pages/ethics-policies/PolicyPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ManageCarouselPage } from "./modules/admin/pages/carousel/ManageCarouselPage";
import { ManageDeafulters } from "./modules/admin/pages/policy-breaches/manage-defaulters/ManageDeafulters";
import { UpdateEthicsDefaulters } from "./modules/admin/pages/policy-breaches/ethics-defaulter/UpdateEthicsDefaulters";
import { EthicsResourceDisplayPage } from "./modules/employee/components/EthicsResourceDisplayPage";
import { ReportPage } from "./modules/admin/pages/quiz/ReportPage";
import { EthicsActivity } from "./modules/admin/pages/recognition/EthicsActivity";
import { QuickLinkSetUpPage } from "./modules/admin/pages/quick-links/QuickLinkSetUpPage";
import { SectionedBlogPosts } from "./modules/employee/pages/ethics-articles/ethics-articles-page/SectionedBlogPosts";
import {
  EthicsChampionOfTheYear,
  EthicsChampionOfTheYear as EthicsSpotlightCreate,
} from "./modules/admin/pages/recognition/EthicsChampionOfTheYear";
import { UpdateEthicsActivity } from "./modules/admin/pages/recognition/UpdateEthicsActivity";
import { AllPhotos } from "./modules/employee/pages/recognition/champion-recognition/ethics-champion-activties/components/AllPhotos";
import { RecognitionAllPhotos } from "./modules/employee/pages/recognition/employee-recognition/RecognitionAllPhotos";
import { RecognitionAllVideos } from "./modules/employee/pages/recognition/employee-recognition/RecognitionAllVideos";
import { RecognitionAllWriteUp } from "./modules/employee/pages/recognition/employee-recognition/RecognitionAllWriteUp";

const EthicsPortal: React.FC<IEthicsPortalProps> = (
  props: IEthicsPortalProps
) => {
  jQuery("#workbenchPageContent").prop("style", "max-width: none");
  jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
  jQuery(".CanvasZone").prop("style", "max-width: none");

  const { context } = props;
  const history = useHistory();
  const queryClient = new QueryClient();

  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const email = await sp.utility.getCurrentUserEmailAddresses();

        const findAdmin = await sp.web.lists
          .getByTitle("Admin")
          .items.filter(`StaffEmail eq '${email}'`)
          .get();

        setIsAdmin(findAdmin?.length > 0);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <WebContext.Provider value={{ context }}>
          <ThemeProvider theme={theme}>
            <Router>
              <CreateAdminQuizContextProvider>
                <QuizContextProvider>
                  <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route
                      exact
                      path="/employee/photo-categories"
                      component={PhotoCategories}
                    />
                    <Route
                      exact
                      path="/gallery/photo"
                      component={PhotoGallery}
                    />
                    <Route
                      exact
                      path="/gallery/video"
                      component={VideoGallery}
                    />
                    <Route
                      exact
                      path="/employee/video-categories"
                      component={VideoCategories}
                    />

                    <Route
                      exact
                      path="/recognition/ethicschampion"
                      component={EthicsChampionLandingPage}
                    />
                    <Route
                      exact
                      path="/recognition/activities"
                      component={EthicsChampionsActivties}
                    />

                    <Route
                      exact
                      path="/recognition/champion"
                      component={EthicsChampionLandingPage}
                    />

                    <Route
                      exact
                      path="/recognition/allphotos"
                      component={RecognitionAllPhotos}
                    />

                    <Route
                      exact
                      path="/recognition/allvideos"
                      component={RecognitionAllVideos}
                    />
                    <Route
                      exact
                      path="/recognition/allwriteup"
                      component={RecognitionAllWriteUp}
                    />

                    <Route
                      exact
                      path="/trainings/traininglandingpage"
                      component={EthicsTrainings}
                    />
                    <Route
                      exact
                      path="/ethics/training/businessethics"
                      component={BusinessEthics}
                    />
                    <Route
                      exact
                      path="/ethics/training/mtnethicstrainingvideos"
                      component={MtnTrainingVideo}
                    />
                    <Route
                      exact
                      path="/ethics/training/organizationalethics"
                      component={OrganizationEthics}
                    />

                    <Route
                      exact
                      path="/ethics/policybreaches"
                      component={PolicyBreaches}
                    />

                    <Route
                      exact
                      path="/policybreaches/ethicsdefaulters"
                      component={EthicsDefaulters}
                    />
                    <Route
                      exact
                      path="/ethics/articleslandingpage"
                      component={ArticlesLandingPage}
                    />
                    <Route exact path="/posts" component={SectionedBlogPosts} />

                    <Route
                      exact
                      path="/ethical/leadership/series"
                      component={LeadershipSeries}
                    />

                    <Route
                      exact
                      path="/ethics/contactus"
                      component={ContactUs}
                    />

                    <Route
                      exact
                      path="/view/category/training/:id"
                      component={ViewEthicsTraining}
                    />

                    <Route
                      exact
                      path="/employee/quiz/landing"
                      component={QuizLandingPage}
                    />
                    <Route
                      exact
                      path="/quick-links"
                      component={QuickLinkPage}
                    />

                    <Route
                      exact
                      path="/employee/take-quiz"
                      render={() => <QuizPage />}
                    />
                    <Route
                      exact
                      path="/employee/review"
                      component={QuizReviewPage}
                    />
                    <Route
                      exact
                      path="/employee/quiz-result"
                      component={QuizResultPage}
                    />
                    <Route exact path="/blog/post/:id" component={Post} />
                    <Route
                      exact
                      path="/employee/policy/:policyId"
                      component={PolicyLandingComponent}
                    />

                    <Route
                      exact
                      path="/page/writeup/:sectionId"
                      component={WriteUpPage}
                    />
                    <Route
                      exact
                      path="/page/policy/:sectionId"
                      component={PolicyPage}
                    />
                    <Route
                      exact
                      path="/page/resources/:id"
                      component={EthicsResourceDisplayPage}
                    />

                    <Route
                      exact
                      path="/admin/dashboard"
                      render={() => <AdminDashboard />}
                    />
                    <Route
                      exact
                      path="/admin/user/create"
                      render={() => <CreateAdminPage />}
                    />

                    <Route
                      exact
                      path="/admin/create-post"
                      render={() => <CreateBlogPost context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/post/:postId/update"
                      render={() => <UpdateBlogPostPage context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/manage-posts"
                      render={() => <ManageBlogPostsPage />}
                    />
                    <Route
                      exact
                      path="/admin/create-quiz"
                      render={() => <CreateQuizPage />}
                    />
                    <Route
                      exact
                      path="/admin/manage-quiz"
                      render={() => <ManageQuizPage />}
                    />
                    <Route
                      exact
                      path="/admin/quiz/:quizId/report"
                      render={() => <QuizReportPage />}
                    />
                    <Route
                      exact
                      path="/admin/quiz-report"
                      render={() => <ReportPage />}
                    />
                    <Route
                      exact
                      path="/admin/manage-links"
                      render={() => <QuickLinkSetUpPage />}
                    />
                    <Route
                      exact
                      path="/admin/gallery/"
                      render={() => <Gallery />}
                    />
                    <Route
                      exact
                      path="/admin/gallery/:uploadId/update"
                      render={() => <UpdateGalleryPage context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/gallery/images"
                      render={() => <ImageUploadPage context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/gallery/videos"
                      render={() => <VideoUploadPage context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/recognition/create"
                      render={() => <CreateRecognition context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/recognition/manage"
                      render={() => <ManageRecognitionPage />}
                    />

                    <Route
                      exact
                      path="/admin/recognition/:recognitionId/update"
                      render={() => <UpdateRecognitionPage context={context} />}
                    />

                    <Route
                      exact
                      path="/admin/recognition/spotlight"
                      render={() => (
                        <EthicsChampionOfTheYear context={context} />
                      )}
                    />

                    <Route
                      exact
                      path="/admin/recognition/activities"
                      render={() => <EthicsActivity context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/:activityId/activities"
                      render={() => <UpdateEthicsActivity context={context} />}
                    />

                    <Route
                      exact
                      path="/admin/scrolling-text"
                      component={ScrollingTextSetUpPage}
                    />
                    <Route
                      exact
                      path="/admin/carousel"
                      component={ManageCarouselPage}
                    />
                    <Route
                      exact
                      path="/admin/training"
                      render={() => <VideoTrainingPage context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/policies"
                      render={() => <ManagePoliciesPage />}
                    />
                    <Route
                      exact
                      path="/admin/policy/:policyId/update"
                      render={() => <UpdatePolicyPage context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/create-policy"
                      render={() => <CreatePolicy context={context} />}
                    />
                    <Route
                      exact
                      path="/admin/manage-policy"
                      render={() => <ManageAdminPolicyPage />}
                    />
                    <Route
                      exact
                      path="/admin/policy/:policyId"
                      render={() => <PolicyDetailPage />}
                    />

                    {/* Start of Policy Breaches */}

                    <Route
                      exact
                      path="/admin/policy-breaches"
                      render={() => <PolicyBreachesForm context={context} />}
                    />

                    <Route
                      exact
                      path="/admin/ethicsdefaulters"
                      render={() => <AdminEthicsDefaulter context={context} />}
                    />

                    <Route
                      exact
                      path="/admin/ethics/managedefaulters"
                      render={() => <ManageDeafulters />}
                    />

                    <Route
                      exact
                      path="/admin/ethics/defaulters/:defaultersId/update"
                      render={() => (
                        <UpdateEthicsDefaulters context={context} />
                      )}
                    />

                    <Route path="*" component={NotFound} />
                  </Switch>
                </QuizContextProvider>
              </CreateAdminQuizContextProvider>
            </Router>
          </ThemeProvider>
        </WebContext.Provider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default EthicsPortal;

export const WebContext = React.createContext<{
  context: WebPartContext;
} | null>(null);
