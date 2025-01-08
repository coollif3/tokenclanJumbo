import { getDictionary } from "@app/[lang]/dictionaries";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  CardMedia,
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

export const metadata = {
  title: "Terms and Conditions Page | TokenClan",
  description: "TokenClan Terms Page",
};

export default function Terms() {
  // const { extraPages } = await getDictionary(lang);
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Typography variant="h3" align="center" mb={3}>
        TokenClan.io Web Site Terms and Conditions
      </Typography>
      <JumboCard
        // title={
        //   <Typography variant='h6' color={'text.secondary'}>
        //     About Us
        //   </Typography>
        // }
        // subheader={
        //   <Typography component={'h2'} variant={'h1'}>
        //     A biggest digital marketing agency in the world
        //   </Typography>
        // }
        contentWrapper
        contentSx={{ pt: 0 }}
      >
        <Grid>
          {/* <Grid item xs={12} md={6}>
            <CardMedia
              component={'img'}
              sx={{ borderRadius: 2 }}
              image={getAssetPath(
                `${ASSET_IMAGES}/pages/cherrydeck.jpg`,
                '640x820'
              )}
              alt={'About Us'}
            />
          </Grid> */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* <Button
              disableRipple
              variant={'text'}
              sx={{
                px: 0,
                ml: '-5px',
                mt: { md: 2 },
                mb: 2,
                textTransform: 'none',
                color: 'text.primary',

                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <PlayCircleIcon sx={{ fontSize: '3rem', mr: 1 }} /> Watch Intro
            </Button> */}
            <Box sx={{ maxWidth: "1000px", margin: "auto" }}>
              <Typography variant={"h6"} mt={5} mb={3}>
                Latest Version: 29 July 2024
              </Typography>
              <Typography variant="h6" mb={3} paragraph>
                Website Terms of Use
              </Typography>
              <Box mb={3}>
                <Typography variant="body1" paragraph>
                  Flag One Pte Ltd ("Tokenclan", “we”, “our”, “us” or
                  “Company”), a private limited company incorporated under the
                  laws of Singapore, UEN 200721476H, operates a website,
                  www.tokenclan.io (the "Website") which Tokenclan aggregates
                  and provides information on cryptocurrency, utility tokens,
                  digital coins/currency, initial coin offerings that do not
                  amount to an offering of securities or securities-tokens
                  (“ICO”), and other related digital currency information,
                  features for online subscription, registration of account,
                  registration of interest for any of our services or events
                  and/or any other services and products provided by our Company
                  whether by itself or in conjunction with other third parties
                  (individually and collectively, our “Site Services”).
                </Typography>
                <Typography variant="body1" paragraph>
                  The Website, our Site Services, as well as any related forums,
                  blogs, social media pages and other relevant platforms
                  operated or maintained by Tokenclan shall hereinafter be
                  severally and collectively referred to as the “Site”. For the
                  avoidance of doubt, the Site pertains only to cryptocurrency,
                  and not any products or instruments that can be classified as
                  “securities” thereunder the Securities and Futures Act (Cap.
                  289).
                </Typography>
                <Typography variant="body1" paragraph>
                  By accessing or using our Site (or any of our Site Services),
                  signing up for any of our services or products in any way, you
                  hereby accept these Website Terms of Use, our Privacy Policy,
                  Disclaimer, as well as any other terms of service (including
                  rules and guidelines) that may be implemented from time to
                  time in relation to our Site (collectively, the "Agreement").
                </Typography>
                <Typography variant="body1" paragraph>
                  Tokenclan reserves the right at its sole discretion to amend
                  any provision of the Agreement (including this Terms of Use)
                  at any time in our sole discretion without any prior notice to
                  you, and you agree that it is your responsibility to check for
                  the updated terms of the Agreement on our Website regularly.
                  In any event, by continuing to use any aspect of our Site
                  and/or any of our Site Services you will be deemed to have
                  accepted all amendments to the Agreement as may be implemented
                  by Tokenclan from time to time. If you do not wish to be bound
                  by the Agreement, do not use any aspect of the Site or Site
                  Services, cease all access to and use of our Site, our Site
                  Services, our products and services immediately.
                </Typography>
              </Box>
              <Typography variant="h6" paragraph mt={5}>
                1. Capacity & Access
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1.1 By accessing our Site and continuing to access our Site and/or Site Services, you represent that you are above 18 years of age, and legally capable of entering into and being bound by contracts, including but not limited to the Agreement." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="1.2 In the event that you are accessing our Site and/or Site Services on behalf of any incorporation, partnership, association, organization or any other entity type (“Entity”), your continued access of our Site and/or Site Services shall constitute your representation to us that you have been duly authorized by such Entity to use our Site and our Site Services, perform any transactions or activities thereon, and to therefore bind your Entity to the Agreement and to any such transactions or activities that you have performed. Accordingly, when the term “you” is used herein this Website Terms of Use, “you” shall refer not only to you the actual user as an individual, but also the Entity that you are representing, and therefore both you and the Entity are jointly and severally bound under the Agreement. Accordingly, you also hereby undertake that the Entity which you represent is capable of and agreeable to being bound by the Agreement." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="1.3 In the event that you submit a form or query to us, or you register with us an account (whether in your personal capacity or on behalf of the Entity that you represent), you undertake to ensure that all information you provide to our Company thereto registration is accurate and updated, and will promptly notify us via email to support@tokenclan.io in the event of any changes to such information." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="1.4 In the event that you register an account with us, you are fully responsible for ensuring that your account login and passwords are kept strictly confidential and secure, as all activities conducted via your account shall be deemed as all acts duly performed and/or authorized by you without the requirement for any further verifications on our part. Should you become aware of any security breaches or unauthorized access to your account, you must notify our Company immediately via email to support@tokenclan.io. Nonetheless, you agree that you will be fully responsible for all acts and usage of any of our Site Services that take place via your account prior to your aforesaid notification of security breach to us, and you undertake to honour and see to completion all such acts and transactions that has happened under your account (regardless of whether you have specifically authorized such acts or transactions)." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="1.5 Should you (whether directly by yourself or indirectly via your request to us) upload, post, publish, or transmit any information on or via our Site, or you communicate with any other users of our Site, you agree to be fully responsible for all such posts and communications. Accordingly, you undertake to only use the Site in a legal and considerate manner, not to misuse or abuse the Site or its other users, including but not limited to not causing any defamation, harassment, sedition, collecting data of other users for your own purposes, and introducing virus, trojans or hacks. In the event that you misuse or abuse the Site, we shall be fully entitled to suspend or ban your account, and/or remove your information from our Site without any prior notice or liability to you. Nonetheless, you agree that we shall not be howsoever liable for any posts or communications by third parties that offend you, although we will sincerely look into any complaints in relation to such posts or communications that you communicate to us of in writing." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                2. Updates & Modifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="2.1 You agree that it is your responsibility to regularly check our Website Terms of Use, our Privacy Policy and Disclaimer to keep yourself updated of any changes or modifications." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2.2 You agree that the terms of our Agreement may be amended, modified, varied or revised from time to time without any prior notice to you, and your continued use of our Site and/or Site Services following any such changes constitutes your agreement to be fully bound by our amended terms. The date that appears at the commencement of each relevant terms and conditions constitutes the latest version of such terms and conditions that is in force and binding on you as part of the Agreement." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2.3 You agree that we are entitled to howsoever modify, vary, expand, suspend, interrupt, terminate, cancel or discontinue any services or products or accessibility to any feature or part of our Site and/or Site Services at any time in our sole discretion without any prior notice or liability to you, even if you have a registered account with us." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2.4 Certain of our Site Services incorporate or require the use of third party products and services.. Therefore your use of such third party products and services will be subject to the respective third party’s terms and conditions and privacy policies, which you agree is your responsibility to regularly review from time to time to determine their acceptability to you before you use such third party products and services. For the avoidance of doubt, all coin, token or digital currency swap and exchange functions found on or linked to the Website are provided “as is” received from third parties, and are not the products of Tokenclan, Tokenclan does not process such swaps or exchanges, nor is Tokenclan a custodian to any form of e-money, stored value, digital coins or tokens." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                3. Our Site Content
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="3.1 No information, write-ups, prices, events, cryptocurrency data, data metrics,  photographs, pictures, graphs, charts, news articles, news updates, advertisements, data, analysis, reports, media files and other content on our Site (collectively, “Site Content”), or our newsletters, EDMs, marketing materials, promotional updates, messages (via any channels), or other emails (collectively, 'Updates') which you may have viewed, subscribed to or downloaded via our Site or Site Services, constitutes advice of any kind, including but not limited to financial advice, trading advice, investment advice, insurance advice, legal advice or any other form of advice for which a license to provide such advice may be required under applicable law. 'Site Content' and 'Updates' shall collectively be referred to as 'Content'." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.2 The content on our Site and Updates are meant to provide information regarding our Company, our products, our services, our applications, prices, or market value and data metrics of cryptocurrencies, tokens, coins, rankings and other information related to digital currency. The aforesaid information constitutes general knowledge only, and are not meant for any reliance howsoever for any purpose of any kind whatsoever by any Entity or individual. You are therefore strongly advised to procure your own checks and professional advice before you decide to make any trade, investments or swaps as no Content constitutes any trading or investment advice or guarantees of any kind (including but not limited to guarantees on gains/benefits/returns). For the avoidance of doubt, our Company makes available the Content and third party products on our Site based on information and/or products (such as price data) procured from third party sources. Even though such third parties may have agreed or declared that all information and products that they provide will be correct and/or secure, and our Company has done its reasonable checks as may be commercially practicable before uploading such Content and products onto our Site, our Company is not able to provide any warranties thereon." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.3 Our Site Services include, without limitation, our TVEV chart and Future Spot Stats (collectively, 'Data Metrics') which as of now is available for use with a subscription charge, subject to compliance with our Terms of Service, and identification protection. We make no direct or indirect warranties of any kind, express or implied, in relation to our Site Services (including but not limited to the Tokenclan Data Metrics and third party provided functionalities), and you are therefore strongly encouraged to conduct your own checks, verifications, consult your advisors and satisfy yourself of the suitability of our Site Services as well as the acceptability (to you) of the terms and conditions of the respective third party service providers whose services/products are made available or referenced to on our Site before you use any such Site Services. All use of our Site Services (including third party provided services/products) is at your sole risk and discretion." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.4 Our Content may contain information on third party products and services, in particular but not limited to cryptocurrency exchanges, ICOs, third party coins, tokens and cryptocurrency wallets. However, this does not imply any association with or endorsement by such third parties, even if certain functionalities on our Site requires the use of such third party products. The content of such third party services and products as stated on our Site and in our Updates are based on information made publicly available or by such third parties to us, and we therefore make no representations or warranties on the accuracy or updatedness of such third-party service/product related information. You are encouraged to conduct your own checks on any such third party products or services that you see on our Site and/or our Updates before subscribing to, registering an account for, installing, trading, swapping, investing, purchasing or using any such third party products/services, whether from third party sites or via our Site." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.5 As part of our provision of information regarding cryptocurrency, utility tokens, digital coins/currency, ICOs that do not amount to an offering of securities or securities-tokens, and other related digital currency information on our Site, our Content may contain videos and podcasts (or links to such videos and podcasts) pertaining to the aforesaid subject-matter made available via YouTube, or the use of YouTube API Services (as defined in the YouTube Terms of Service). In order to access such podcasts and videos, you must agree to be bound by the “YouTube Terms of Service” found at  https://www.youtube.com/t/terms. In the event that you do not agree with any of the terms and conditions therein the YouTube Terms of Service, you are not permitted to access the aforesaid videos and podcasts (or weblinks thereto) found on our Site and in our Content." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.6 Any monetary figures cited in our Content may have been converted from local currency to United States Dollars, or from one currency to another, using internet currency conversion sites, and such values may therefore vary or be subject to change depending on the rates provided by different currency conversion sites." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.7 Where the Content contained on our Site and Updates are derived from non-English language sources, translations into English may have been done using language conversion tools. As such, our Company assumes no legal liability for any inaccuracies or misunderstandings due to translations." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.8 Reviews of our services, products, Content, exchange coin opportunities, trading opportunities, our Site, and other matters related to our Company provided by individuals or third party companies as reflected in our Content are the personal views of such individuals or third party companies, and do not represent the view of the Company, nor any implied endorsement or recommendation by the Company. Such reviews are also not to be deemed as any warranty, express or implied, of the quality or efficacy of the reviewed products, services or other subject-matter." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.9 We may make available limited trial services via our Site and/or our Updates. You agree that when you sign up for any such free trial services, it is not guaranteed that such free trial services or certain features thereto will definitely be made available to you, or the trial period may be different from what may have been published on our Site, our Updates or on other third party channels." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3.10 Promotions, trial usage, and discounts (if any) as featured on our Site and/or our Updates are for limited time-periods only and subject to specific terms and conditions indicated as may be applicable in order to enjoy such promotions, trial usage, and/or discounts. Once a promotional or trial period expires, you are no longer eligible to participate in such promotions or trial usages, and our Company is not howsoever obligated to provide any such previously offered privileges, trial usage or discounts to you even if you have contacted our Company with queries during the promotional period." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                4. Intellectual Property
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="(A) Ownership" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4.1 All Content and Site Services, including but not limited to, write-ups, compilations, listings, analysis, summaries, extracts, derivations, articles, translations, quotations, contracts, terms and conditions, software, algorithms, source codes, forecasts, analysis, metrics, reports, logs, diagrams, graphs, charts, layout, photographs, drawings, financial information and other data, as displayed on our Site and Site Services, in our Content and in our Updates, are protected by copyright, design rights, trade mark rights and/or other intellectual property rights (whether owned by our Company or licensed to our Company, or permitted under the law for use by our Company), whether registered, registrable or otherwise. You agree therefore that without our Company's prior written consent (or as may be specifically stated on our Site in relation to any particular portion of our Content such as use of our Tokenclan Data Metrics pursuant to our Terms of Service), except for the limited use as permitted thereunder Section 4(B) below, you are not otherwise permitted to howsoever reproduce, copy, download, decompile, disassemble, extract, store, distribute, lease, time-share, publish, sell, translate, modify or create derivative works from, any part of our Content, products or services found on our Site, our Site Services, or in our Updates. We reserve our rights to take legal action against you for any such unauthorised use of our Content." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4.2 For clarification, and without prejudice to Clause 4.1 above, all Content and Site Services (including but not limited to the Tokenclan Data Metrics and other third party products/services) are strictly protected by copyright laws. You are therefore not permitted to howsoever copy, reproduce, duplicate, download, derive, modify, translate, hack, distribute, lease, rent or howsoever deal with any part of our Content or Site Services except to view or use strictly pursuant to the purpose for which it was made available (on your computer, mobile phone, tablet and other personal devices or Entity’s devices that are under and securely in your control) as may be permitted herein and/or by the other provisions of the Agreement. In the event that any other provisions of the Agreement permit you to download, store, use, retain or copy any part of our Content or any mobile application or other software or feature (individually and collective 'Downloads') available on our Site, you agree that such consent shall not constitute the transfer or assignment of any rights or ownership in such Downloads to you, and you are merely granted a non-exclusive, non-sublicensable, non-transferable and revocable (at any time by our Company) licence to use the Downloads pursuant to the purpose for which our Company granted its consent." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4.3 All company names (including but not limited to our Company's name, and the company names of any third parties, featured on our Site), logos, trademarks, service marks, brands, whether registered or otherwise (collectively the 'Branding') represented on our Site, our Site Services and in our Updates belong to our Company or to third parties who have agreed (or our Company is so permitted under applicable law) to display their Branding on our Site and Site Services, in our Content and our Updates. You are therefore not permitted to copy, replicate, modify, extract, download or howsoever use any such Branding for any purpose whatsoever without the prior written consent of our Company." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="(B) Limited Use" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4.4 Subject to the provisions of this Website Terms of Use and your compliance thereto, our Company hereby grants you a limited, personal, non-exclusive, non-sub-licensable and non-transferable license to use our Site Content, in each case solely for your Personal Use (as defined in Clause 4.5 below) only and not for any commercial purpose. Except for the aforegoing license, you have no other rights to any of our Content, Site Services, Branding, products or services, and without limiting the generality of Clauses 4.1 to 4.3 above, you may not modify, edit, copy, distribute, reproduce, publish, display, perform, license, sell, rent, lease, loan, develop derivations, create any index, translate, reverse engineer, alter, enhance, provide access to or in any way exploit any part of the Content, our Site Services, Branding, or any of our services or products in any manner." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4.5 'Personal Use' shall refer to your non-commercial review and republication (on a non-commercial site) of some or part of our Site Content (as screenshots or screen captures without any modification thereto and with due attribution to Tokenclan), and the linking of our Website, subject to Clause 4.6 below." />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="4.6 You may republish some or part of our Site Content (individually and collectively, the 'ScreenCaptures'), and/or place one or more links to the Website (individually and collectively, the 'Link') on your own non-commercial website, blog or other platform (individually and collectively, 'Your Platform'), provided that:
                    Any Link shall be titled only as 'Link to Tokenclan.io';
                    Any ScreenCaptures shall be duly attributed with the phrase 'Screenshot from Tokenclan.io';
                    No ScreenCaptures shall contain third party information, write-ups or feedback (i.e. information from an user of Tokenclan or information regarding other entities, which are not information from or about Tokenclan itself), nor any personal data (i.e. information that can be used singly or in conjunction with other available information to identify an individual);
                    Your Platform shall not contain any content that is unlawful, threatening, scandalous, seditious, abusive, libellous, defamatory or otherwise inappropriate to the image of Tokenclan (as may be determined by our Company in our sole discretion);
                    The look and feel of all content that accompanies the ScreenCaptures and/or Link or is on the same page as any ScreenCaptures or the Link shall not (as determined in the sole discretion of Tokenclan) bear any write-ups, pictures, content, insinuations, or implications that may lower the reputation of Tokenclan, damage or dilute the goodwill associated with Tokenclan, the reputation or any Branding
                    No content on Your Platform shall contain any information that (in Tokenclan’s sole discretion) may create any false impression that you, Your Platform, services, products or any other website, services, products, person or entity is endorsed by, sponsored by or otherwise associated with Tokenclan or any of its business partners (as reflected by their names, logos, or branding on the Website), or that any activity engaged in by you or anyone else has been howsoever endorsed by Tokenclan.
                    You agree that our Company retains full rights to revoke our consent granted herein to permit your Link or ScreenCaptures at any time in our sole discretion without any prior notice or liability to you. Upon our email notification to you that you may no longer provide a Link or ScreenCaptures on Your Platform, you undertake to promptly (in no event later than two days after our notice to you) remove all such objectionable Link or ScreenCaptures from Your Platform."
                  />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                5. Third Party Sites and Browsing Experience
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="5.1 Please note that we do not control any links, services, content, products (including but not limited to Youtube videos, social media content) or resources provided by other third parties via or referenced or linked to our Site, our Site Services, or in our Updates, even if such third party’s website, services and/or products are expressly made available on our Site and/or may be co-branded with ours by bearing our Company logo or name. We seek your further understanding that we are unable to control or influence any third parties' actions even if their websites are hyperlinked to our Site, our Site Services, or in our Updates. Accordingly, should you decide to use or access such third parties’ products, services and/or websites, all use and access are at your sole risk and subject to the terms and conditions of use of such third parties’. If you have any query on the terms and conditions of use of such third parties’ websites or their services or products, please contact the third parties directly." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5.2 Without limiting the generality of Clause 5.1 above, our Company hereby disclaims any and all scams, frauds, and other non-genuine services or products that may be displayed in any advertisements or banners displayed on our Site. Our Company is careful about the advertisement placements that it accepts, however, it is not possible for us to check and verify the authenticity or legality of each advertiser, advertisement, product or service that is advertised with our Company. As such, you agree that you will conduct your own due diligence and checks, as well as accept all risks thereto, should you in your own voluntary discretion purchase, subscribe or sign on for any products or services advertised by third parties on our Site." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5.3 You agree that our Company may employ cookies, action tags, dynamic device identifiers, or other legal technological means to record your anonymised accessing of our Site for the purpose of providing better services and enhancing your browsing experience. Further details of such technological means are as set out in our Privacy Policy." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                6. Minors
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="6.1 Our products and services are targeted for adults and business entities. Our Site, our Site Services, our Content and our Updates are therefore not meant for persons who may be defined as minors under applicable law. However, it is not possible for our Company to determine whether any user of our Site or Site Services is a minor. If you are a minor, please discontinue the use of our Site and all Site Services immediately. It is the responsibility of parents and legal guardians to monitor whether a minor is using our Site or Site Services." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                7. Feedback
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="7.1 In the event that you provide us with any feedback and comments, whether via email to our Company or any postings, we thank you for taking the time to write to us, and your feedback and comments are appreciated. Any such feedback, postings, and comments from you (“Feedback”) shall become and remain the property of our Company. Our Company shall be entitled in its sole discretion to howsoever use, publish or disseminate such Feedback, with or without attribution to you as the Feedback’s author, and without having to notify you or seek your consent in advance. Accordingly, you agree that you assign (without the requirement for any remuneration) all ownership (including but not limited to copyright) in the Feedback to our Company once you submit your Feedback to our Company, and you further agree to waive all moral rights over your Feedback once submitted to the Company." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="7.2 Kindly note that you are responsible for your Feedback, and you should ensure that such Feedback does not contain any libellous, scandalous, defamatory, offensive, seditious, misleading, misrepresentative, abusive or infringing contents, particularly if such Feedback will be published to the public whether via our Site, or our Updates, or other means (even if you were not aware that your Feedback would be published). You agree to fully hold harmless and indemnify our Company for all losses and costs suffered or incurred by our Company due to your Feedback, including but not limited to third party claims, legal fees on a solicitor-client basis, settlement amounts, fines, penalties, and law enforcement actions. Accordingly, and without prejudice to the aforegoing, you also hereby undertake to fully indemnify, defend and hold harmless our Company, our employees, agents, officers, shareholders, and directors from claims, demands, direct damages, indirect damages, consequential damages, loss of opportunities, loss of reputation, legal costs (on a client-solicitor basis) and other losses of any kind that may arise in relation to any dispute that you may howsoever have with another user of our Site." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                8. Disclaimers and Limitation of Liability
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="8.1 While we have exercised due care in the preparation of all Content displayed and/or made available on our Site, our Site Services, and in our Updates, such content, data, information, Content and materials are provided 'AS IS', 'WITH ALL FAULTS' and 'AS AVAILABLE'." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.2 Your use of our site, our site services, and our updates, as well as your viewing, downloading of content (including but not limited to Tokenclan’s Data Metrics), is at your own discretion and risk. Our company makes no claims, representations, warranties (express or implied) or promises about the quality, accuracy, updateness, non-omissions, continued accessibility, clarity, resolution, non-interruptedness, speed, fitness for a particular purpose (even if we have been informed in advance of such purpose), correctness of financial data and trading volume, trading returns, security of transactions, projected investment/subscription returns, failed encryption or failure to encrypt, data corruption, the acts or omissions of other users of our site, or reliability of our site, our site services, our content or our updates, including but not limited to their safety or security, freedom from computer viruses, worms, trojan horses, and full-proof security against third party hackers." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.3 In addition, our company makes no claims, representations, warranties (express or implied) or promises about the correctness of our content or site services, that any errors in any part of our content or site services will be corrected, that resolutions will be enhanced, merchantability, quality, timeliness of delivery, usability, fitness for a particular purpose (even if we have been informed in advance of such purpose), suitability for specific viewing requirements, returns on investments, financial status, market value accuracy, accuracy of financial information (including projections, budgets and forecasts), accuracy of credit check results, ratings and other due diligence reports, the acts or omissions of other users of our site, non-infringement or reliability of any write-ups, products or services displayed on our site, our site services and/or in our updates. You, at your own volition and discretion, use our site services, access our content, enter into subscriptions, sign-ups and/or enter into other transactions via our site after having done your own due diligence checks and with due consideration, and therefore all subscriptions, sign-ups, and/or other transactions are at your sole risk and voluntary assumption of liability." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.4 Any credit checks, ratings, litigation history, key personnel reports, or other information that may be provided in our content in relation to any fundraisers (where such information is not provided by the fundraiser itself) are based on third party websites, service providers and bureaus, and we are therefore unable to warrant or undertake any liability on the reliability, validity and accuracy of such third party reports." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.5 In no circumstances, to the fullest extent permitted at law, shall our company nor any of its shareholders, directors, officers, agents, representatives or employees be liable for any damages, loss, loss of customers, lost profits, lost interest payments, lost principals, lost business, lost opportunities, loss of investments, lost data, cost of servicing or repair of tablet, smart phones, mobile phones, computer or other equipment, special damages, indirect or consequential loss or damages, howsoever arising or suffered as a result of any use (or inability to use) of our site or our updates or content or site services or our services or our products, or our company's breach of any provision herein this website terms of use or other provisions of the agreement, or misrepresentation or negligence or fraud by any fundraisers, whether due to viruses or third party hackers or embedded malware, or any reliance on or use of the information, content, third party links, the services or products introduced or described herein our site, our site services, or our updates even if our company has been advised of such use or reliance in advance." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.6 Our Company further disclaims any and all liability for any losses or damages that you may incur as a direct result of accessing or howsoever using (including but not limited to storing of information on) our Site, our Site Services, our Content or our Updates, including but not limited to any virus, trojan horse, malware or worm attacks on your tablet, smart phone, or computer." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.7 For the avoidance of doubt, at all times, our Company acts primarily as an information service provider, and never as a sales representative, trading broker, intermediary, agent, principal, financial advisor, exchange, brokerage, clearing house or trading platform of any kind or capacity for which a licence from the Monetary Authority of Singapore may be required. Without limiting the generality of the aforegoing, the availability of coin purchase functionalities on our Website does not render our Site a trading platform for securities. Accordingly, no information in our Content is to be regarded as an offer, solicitation, or an invitation to treat by our Company. Nothing in our Content constitutes any advice or recommendation to subscribe to any particular coin, token or ICO, trade in any digital coins, purchase any tokens or perform any token swaps. Should you wish to trade in any specific coins, please contact your broker or trade via the relevant coin exchange platforms accordingly. You agree that our Company bears no liability whatsoever to you in relation to any subscription, product (including coin) purchase, trade or swap that you carry out at your sole risk and discretion." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.8 You are strongly encouraged to conduct your own due diligence checks and procure your own professional advice before subscribing, trading, purchasing, using our Tokenclan’s Data Metrics as analysis for swapping any tokens, or entering into any transactions due to use of or access to our Site. You should only enter into any transaction after due and careful consideration, understanding the risks, and having considered whether you are able to bear such risks of losses. It is therefore in your total and sole discretion as to whether to use any of our Site Services to swap, trade, purchase and/or subscribe to any coins/tokens listed on our Site. You are at no time under any duress from our Company, and/or any other users of our Site to trade, swap, purchase, subscribe and/or enter into any transactions. Therefore, you agree that you voluntarily assume all risks and full liability in all your transactions, and undertake that you shall not howsoever hold the Company liable or responsible whatsoever in the event of any damages or losses suffered, including but not limited to losses that you may suffer due to misrepresentation, negligent information or fraudulent acts of any Fundraisers." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="8.9 In the event that our Company’s liability to you in relation to our Site, our Site Services, our Content, our Updates, products and/or services featured on our Site and/or Updates, cannot be fully disclaimed, you agree that our Company’s total liability to you shall not exceed S$20, which you agree is a reasonable compensation amount taking into consideration the limited nature of our Company’s services. Accordingly, you agree that upon receipt of S$20 from the Company, you will waive all rights against the Company and will make no further claims whatsoever against the Company." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                9. Non-Interference
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="9.1 You undertake that you shall not howsoever mine data from, scrape, interfere or attempt to interfere with any part of our Site or Site Services, disrupt accessibility to our Site (or any part thereof), or bypass any security measures that we may include with our Site and/or Site Services, including but not limited to the utilization of any screen-scraper, hacks, spider, robot, virus, worms or other means to access or attack our Site or Site Services for any purpose without our prior written consent." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                10. Indemnification
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="10.1 You agree to fully indemnify, defend and hold our Company and its shareholders, directors, officers, employees, representatives, agents, subcontractors, and licensors harmless from and against any and all claims (including but not limited to third party claims for intellectual property infringement due to your breach of Section 4 and/or Clause 9.1 herein), damages, costs and expenses, including but not limited legal fees and settlement payments on a full indemnity (solicitor-client) basis arising from or related to your breach of any of the provisions herein this Website Terms of Use, our Privacy Policy, any other service provisions of the Agreement, your use of our Site, our Site Services, our Content and/or Updates." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="10.2 For the avoidance of doubt, regardless of the indemnification received by the Company from you, the Company shall have full authority and charge over its own defence, legal actions, and settlement proceedings in relation to any third party claims without any reference to you." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                11. Governing Law and Jurisdiction
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="11.1 Our Website Terms of Use and accordingly your agreement thereto shall be governed by and construed in accordance with the laws of the Republic of Singapore, without reference to any conflict-of-law principles." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="11.2 In the event of any disputes arising from this Website Terms of Use or any of the other provisions of the Agreement, your use of our Site, our Site Services and/or Content, you must first contact our Company’s officer at tokenclan.io regarding your dispute, and use your best endeavours to amicably settle any dispute in good faith. We on our part will also use our best endeavours to amicably settle your concerns in good faith. However, if no amicable resolution is reached within 30 days, both parties agree to submit to the exclusive jurisdiction of the Courts of Singapore." />
                </ListItem>
              </List>
              <Typography variant="h6" paragraph mt={3}>
                12. Miscellaneous
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="12.1 If any provision or clause of our Website Terms of Use, any of our other terms and conditions constituting the Agreement, or part thereof respectively, is rendered void, illegal or unenforceable by any legislation or laws to which it is subject, it shall be modified so as to give effect to its intention, or where such modification is not possible, that provision or clause shall be rendered void, illegal or unenforceable to that extent only and it shall in no way affect or prejudice the enforceability of the remainder of such provision or clause or the other provisions of our Website Terms of Use and our other terms and conditions of the Agreement." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="12.2 The failure or delay of our Company at any time to enforce any of its rights hereunder our Website Terms of Use and other terms and conditions of the Agreement shall not be constituted as a waiver thereof and shall in no manner affect our Company's rights at a later time to enforce the same." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="12.3 You agree that you shall not hold our Company for any delay or failure in performance (including but not limited to non-accessibility to our Site and/or Site Services) due to events beyond our Company’s reasonable control, including but not limited to natural catastrophes, civil riots, acts of war, shortage of utilities, and any applicable laws and regulations." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="12.4 A person who is not a party to this Agreement shall have no right under the Contracts (Rights of Third Parties) Act (Cap. 53B) to enforce any of its terms." />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </JumboCard>
    </Container>
  );
}
