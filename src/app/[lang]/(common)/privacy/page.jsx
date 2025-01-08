import { getDictionary } from "@app/[lang]/dictionaries";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CardMedia,
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

export const metadata = {
  title: "Privacy Page | TokenClan",
  description: "TokenClan Privacy Page",
};

const data = [
  {
    category: "Name and contact details",
    purpose: "To verify identity for fraud prevention and marketing purposes",
    basis: "Consent",
    retention: "Until you withdraw",
  },
  {
    category: "Payment information",
    purpose: "To process payment and refunds",
    basis: "Consent",
    retention: "For three years since you last logged on to the Site",
  },
  {
    category: "Contact history",
    purpose: "To provide customer service and support",
    basis: "Consent",
    retention: "For three years since you last logged on to the Site",
  },
  {
    category: "Purchase history",
    purpose: "To provide customer service/support and handle refund requests",
    basis: "Consent",
    retention: "For three years after purchase",
  },
  {
    category: "Browser, device and Site usage information",
    purpose:
      "For the Site improvement and to protect the Site against fraudulent activities",
    basis: "Consent",
    retention: "For three years since you last logged on to the Site",
  },
  {
    category: "Responses to surveys, competitions and promotions",
    purpose: "To run the survey, competitions or promotions",
    basis: "Consent",
    retention: "Until you withdraw consent",
  },
  {
    category: "Customer comments and product reviews",
    purpose: "To improve products and services",
    basis: "Consent",
    retention: "Until you withdraw consent",
  },
  {
    category:
      "Information generated in the course of the use of our products and services",
    purpose: "To improve the features and functions of the Site",
    basis: "Consent",
    retention: "Until you withdraw consent",
  },
  {
    category: "Information collected through cookies and similar technologies",
    purpose:
      "To conduct and store site usage analytics, statistical and trend analysis for market research",
    basis: "Consent",
    retention: "For three years after you last visited the Site",
  },
];

const cellStyle = {
  border: "1px solid black",
};

export default function Privacy() {
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
        Privacy and Cookies Notice
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
          {/* <Grid item xs={12} md={6}> */}
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
            <Typography variant="h6" mb={2} paragraph>
              ABOUT THIS PRIVACY AND COOKIES NOTICE
            </Typography>
            <Box mb={3}>
              <Typography variant="body1" paragraph>
                The website www.tokenclan.io (the Site) is operated by Flag One
                Pte Ltd (“we”, “us”, “our”), a company incorporated in Singapore
                under company number 200721476H.
              </Typography>
              <Typography variant="body1" paragraph>
                We are committed to protecting your privacy and complying with
                our data protection obligations under the Singapore Personal
                Data Protection Act 2012 (PDPA).
              </Typography>
              <Typography variant="body1" paragraph>
                When you interact with us or use the Site, we act as the data
                controller of your personal data. This means that we are
                responsible for processing your personal data and deciding how
                to use it. This privacy and cookies notice explains the types of
                personal data we may collect about you when you interact with
                us, why we collect it, what we use it for and what rights you
                have over that data. Personal data is any information about an
                identifiable person. Processing is anything we do with your
                personal data, including using, storing, sharing and deleting
                it.
              </Typography>
              <Typography variant="body1" paragraph>
                This notice was last updated on the date shown at the top. We
                may change this notice at any time by posting an updated version
                on the Site and will make reasonable efforts to bring any
                material changes to your attention. You may wish to check it
                before using the Site as any changes will be effective from the
                date that they are made.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                CONTACT INFORMATION
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any concerns or would like further information about
                our use of data or this notice in general, you can contact our
                Data Protection Officer through{" "}
                <Link href="https://support.tokenclan.io/">Contact Us</Link> ,
                or through email;{" "}
                <Link href="mailto:support@tokenclan.io">
                  support@tokenclan.io
                </Link>
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                WHAT INFORMATION DO WE COLLECT?
              </Typography>
              <Typography variant="body1" paragraph>
                We collect, store and use the types of personal data set out in
                the table at the end of this notice.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                HOW WILL WE USE YOUR PERSONAL DATA?
              </Typography>
              <Typography variant="body1" paragraph>
                We will use your personal data for the purposes set out in the
                table at the end of this notice.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                HOW DO WE SHARE YOUR PERSONAL DATA?
              </Typography>
              <Typography variant="body1" paragraph>
                When we share personal data, we do so in accordance with
                Personal Data Protection Act (PDPA), Singapore. We may share
                certain personal data:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. with government or quasi-governmental organisations, law enforcement and other regulatory authorities or third parties when required or permitted by law, including but not limited to in response to court orders, for the prevention and detection of crime and to protect intellectual property and any other legal rights;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. if the Company or part of the business is sold, transferred or integrated with another business, with our advisers, a prospective purchaser, a prospective purchaser’s advisers or the new owner of the Company to facilitate the process; and" />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph>
                We may also provide third parties with aggregated but anonymised
                information and analytics about our customers. Before we do so
                we will make sure that it does not identify you.
              </Typography>
              <Typography variant="body1" paragraph>
                In some cases, when we share personal data, it will involve the
                transfer of that personal data to countries outside Singapore
                which have different data protection standards to those which
                apply in Singapore.
              </Typography>
              <Typography variant="body1" paragraph>
                Where we transfer personal data outside Singapore we will ensure
                that we will obtain your consent for the transfer to be made and
                take steps to ensure there are adequate safeguards to protect
                your privacy rights under a standard of protection that is at
                least comparable to that provided under the PDPA.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                WITHDRAWING YOUR CONSENT
              </Typography>
              <Typography variant="body1" paragraph>
                The consent that you provide for the collection, use and
                disclosure of your personal data will remain valid until such
                time it is being withdrawn by you in writing. You may withdraw
                consent and request us to stop using and/or disclosing your
                personal data for any or all of the purposes listed above by
                submitting your request in writing or via email to our Data
                Protection Officer at the contact details provided below.
              </Typography>
              <Typography variant="body1" paragraph>
                Upon receipt of your written request to withdraw your consent,
                we may require reasonable time (depending on the complexity of
                the request and its impact on our relationship with you) for
                your request to be processed and for us to notify you of the
                consequences of us acceding to the same, including any legal
                consequences which may affect your rights and liabilities to us.
                In general, we shall seek to process your request within ten
                (10) business days of receiving it.
              </Typography>
              <Typography variant="body1" paragraph>
                Whilst we respect your decision to withdraw your consent, please
                note that depending on the nature and scope of your request, we
                may not be in a position to continue providing our goods or
                services to you and we shall, in such circumstances, notify you
                before completing the processing of your request. Should you
                decide to cancel your withdrawal of consent, please inform us in
                writing in the manner described in clause 6.1 above.
              </Typography>
              <Typography variant="body1" paragraph>
                Please note that withdrawing consent does not affect our right
                to continue to collect, use and disclose personal data where
                such collection, use and disclose without consent is permitted
                or required under applicable laws.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                USE OF COOKIES AND SIMILAR TECHNOLOGIES
              </Typography>
              <Typography variant="body1" paragraph>
                We and our third-party service providers use cookies and similar
                technologies to collect information about, and relevant to, your
                usage of the Site. Cookies are small text files that are stored
                on your computer when you visit the Site. It is standard
                practice to use cookies to make your experience better when
                using a website.
              </Typography>
              <Typography variant="body1" paragraph>
                We use the following categories of cookies and similar
                technologies on this Site:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. Strictly necessary cookies: These cookies are essential to enable you to move around the Site and use its features. Without these cookies, services you have asked for (such as remembering your login details or the items you placed in your basket) cannot be provided." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Analytics cookies: These cookies collect information about how you use the Site, for instance which pages you go to most often, what searches you perform and if you get error messages from web pages. Information these cookies collect can be used to improve how the Site works." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Customization cookies: These cookies allow the Site to remember choices you make (such as your user name) and provide enhanced, more personal features. These cookies cannot track your browsing activity on other Sites." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. Social media cookies: These cookies allow you to share your activity on the Site on social media such as Facebook and Twitter. These cookies are not within our control. Please refer to the privacy policies of the social networks in question for information regarding how their cookies work." />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph>
                When you visit the Site for the first time (and periodically
                after that), we will request your consent to the setting of all
                cookies other than strictly necessary cookies.
              </Typography>
              <Typography variant="body1" paragraph>
                You can delete existing cookies and disable some or all types of
                cookies in future if you wish. To disable some or all types of
                cookies, you will have to change the settings on your browser.
                If you change your mind, you can enable cookies again at any
                time. Disabling cookies on your browser may stop the Site from
                working properly.
              </Typography>
              <Typography variant="body1" paragraph>
                To find out more about cookies please visit
                www.allaboutcookies.org.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                THIRD PARTY LINKS
              </Typography>
              <Typography variant="body1" paragraph>
                This Site contains links to other websites over which we have no
                control. We are not responsible for and do not review or endorse
                the privacy policies or practices of other Sites which you
                choose to access from this Site. We encourage you to review the
                privacy policies of those other Sites, so you can understand how
                they collect, use and share your personal information.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                YOUR RIGHTS
              </Typography>
              <Typography variant="body1" paragraph>
                We respect your rights to privacy and will respond to requests
                for access or control over information about you in accordance
                with Data Protection Law. We may require you to verify your
                identity before we take any action.
              </Typography>
              <Typography variant="body1" paragraph>
                Depending on the reason we have your personal data, you have a
                right to:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. access the personal information we hold about you (commonly known as subject access);" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. request that we correct or complete personal information we hold about you that is inaccurate or incomplete;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. request that we erase your personal information in some circumstances, or object to our processing it as detailed at clause 9.5;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. restrict how we use your personal information, in certain circumstances;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. request that we provide you with copies of your personal information in a machine-readable format or transfer it across different services; and" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="6. where we have asked for your consent to process your data, to withdraw this consent." />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph>
                Please note that a reasonable fee may be charged for an access
                request. If so, we will inform you of the fee before processing
                your request. If you wish to exercise any of these rights,
                please contact us using the details in clause 2.1 above.
              </Typography>
              <Typography variant="body1" paragraph>
                We will respond to your request as soon as reasonably possible.
                Should we not be able to respond to your request within thirty
                (30) days after receiving your request, we will inform you in
                writing within thirty (30) days of the time by which we will be
                able to respond to your request. If we are unable to provide you
                with any personal data or to make a correction requested by you,
                we shall generally inform you of the reasons why we are unable
                to do so (except where we are not required to do so under the
                PDPA).
              </Typography>
              <Typography variant="h6" mt={2} mb={2} paragraph>
                Your Right to Object
              </Typography>
              <Typography variant="body1" paragraph>
                You have a right to object to our processing of your personal
                data and ask us to stop doing so. If we are processing your
                personal data or direct marketing purposes (which includes
                profiling to the extent that it is related to such direct
                marketing) and you object to this, we will stop processing your
                personal data immediately.
              </Typography>
              <Typography variant="body1" paragraph>
                If our processing of your personal data is in the public
                interest or pursuant to our legitimate interests and you object
                to this, we will stop processing your personal data unless we
                have compelling reasons which override your interests, or our
                use of your personal data is for the establishment, exercise or
                defence of legal claims.
              </Typography>
              <Typography variant="body1" paragraph>
                We hope that we can satisfy any queries you may have about the
                way we process your data. However, if you have unresolved
                concerns you also have the right to complain to data protection
                authorities by going to www.pdpc.gov.sg
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                DATA RETENTION
              </Typography>
              <Typography variant="body1" paragraph>
                Your personal data will only be kept for as long as necessary
                for our purposes. Specific periods are set out in the table at
                the end of this notice.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                DATA PROTECTION PRINCIPLES
              </Typography>
              <Typography variant="body1" paragraph>
                We process your personal data in accordance with the following
                principles:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. we process your personal data lawfully, fairly and in a transparent way;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. we collect your personal data for specified, explicit and legitimate purposes; any further processing we do is compatible with the original purposes for which for which we collected it;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. we only process personal data which is adequate, relevant and limited to what is necessary to achieve the purpose for which it is processed;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. we take reasonable steps to ensure that all personal data is accurate and kept up to date where necessary;" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. we do not store personal data in a form which identifies you for any longer than is necessary for the purposes of processing; and" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="6. we process personal data securely and in a way that protects against unauthorised or unlawful processing, accidental loss, destruction or damage." />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph>
                When we ask for your personal data we will tell you whether you
                are required by law or contract to provide it, and what will
                happen if you do not provide the data.
              </Typography>
              <Typography variant="body1" paragraph>
                Any request for consent to the processing of your personal data
                will be made directly to you and will include information about
                why we require the personal data and what will be done with it.
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" mb={2} paragraph>
                WHAT IS OUR LAWFUL BASIS FOR PROCESSING?
              </Typography>
              <Typography variant="body1" paragraph>
                We will only process personal data when we have a lawful basis
                for doing that processing. The table at the end of this notice
                sets out the lawful basis we rely on for each type of data we
                process.
              </Typography>
              <Typography variant="body1" paragraph>
                We will choose one of the lawful bases to justify how we use
                your personal data. These are:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. Consent: You have given consent to the processing of your personal data for one or more specific purposes." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Contract: The processing is necessary for the performance of a contract with you or in order to take steps at your request before entering into a contract." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Legal obligation: We need to process your personal data to comply with a legal obligation." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. Vital interests: The processing is necessary to protect the vital interests of you or another person." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. Public interest: Processing is necessary for the performance of a task carried out in the public interest or in the exercise of some official authority." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="6. Legitimate interests: Processing is necessary for the purposes of legitimate interests pursued by us or someone else, except where such interests are overridden by your interests or fundamental rights and freedoms requiring the protection of your personal data." />
                </ListItem>
              </List>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={cellStyle}>
                    Category Of Personal Data
                  </TableCell>
                  <TableCell sx={cellStyle}>Purpose Of Processing</TableCell>
                  <TableCell sx={cellStyle}>
                    Lawful Basis For Processing
                  </TableCell>
                  <TableCell sx={cellStyle}>Retention Period</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={cellStyle}>{row.category}</TableCell>
                    <TableCell sx={cellStyle}>{row.purpose}</TableCell>
                    <TableCell sx={cellStyle}>{row.basis}</TableCell>
                    <TableCell sx={cellStyle}>{row.retention}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Grid> */}
        </Grid>
      </JumboCard>
    </Container>
  );
}
