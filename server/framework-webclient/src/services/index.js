const baseAddress = 'http://localhost:8000'; 
const serviceBaseAddress = 'http://localhost:8000/services';

//auth
export const loginService = baseAddress + '/login';
export const logoutService = baseAddress + '/logout';
export const resetPasswordService = baseAddress + '/resetPassword';

//file
export const downloadFileService = serviceBaseAddress + '/downloadFile';

//project
export const addProjectService = serviceBaseAddress + '/addProject';
export const deleteProjectService = serviceBaseAddress + '/deleteProject';
export const editProjectService = serviceBaseAddress + '/editProject';
export const queryProjectsService = serviceBaseAddress + '/queryProjects';
export const queryAllProjectsService = serviceBaseAddress + '/queryAllProjects';

//topic
export const deleteTopicService = serviceBaseAddress + '/deleteTopic';
export const editTopicService = serviceBaseAddress + '/editTopic';
export const addTopicService = serviceBaseAddress + '/addTopic';
export const queryTopicsService = serviceBaseAddress + '/queryTopics';
export const queryAllTopicsService = serviceBaseAddress + '/queryAllTopics';

//milestone
export const deleteMilestoneService = serviceBaseAddress + '/deleteMilestone';
export const editMilestoneService = serviceBaseAddress + '/editMilestone';
export const addMilestoneService = serviceBaseAddress + '/addMilestone';
export const queryMilestonesService = serviceBaseAddress + '/queryMilestones';

//personnel
export const addPersonnelService = serviceBaseAddress + '/addPersonnel';
export const deletePersonnelService = serviceBaseAddress + '/deletePersonnel';
export const editPersonnelService = serviceBaseAddress + '/editPersonnel';
export const queryPersonnelsService = serviceBaseAddress + '/queryPersonnels';
export const queryAllPersonnelsService = serviceBaseAddress + '/queryAllPersonnels';

export const deleteResumeService = serviceBaseAddress + '/deleteResume';

//contract
export const addContractService = serviceBaseAddress + '/addContract';
export const deleteContractService = serviceBaseAddress + '/deleteContract';
export const editContractService = serviceBaseAddress + '/editContract';
export const queryContractsService = serviceBaseAddress + '/queryContracts';

export const deleteContractResourceService = serviceBaseAddress + '/deleteContractResource';

//customer
export const addCustomerService = serviceBaseAddress + '/addCustomer';
export const deleteCustomerService = serviceBaseAddress + '/deleteCustomer';
export const editCustomerService = serviceBaseAddress + '/editCustomer';
export const queryCustomersService = serviceBaseAddress + '/queryCustomers';
export const queryAllCustomersService = serviceBaseAddress + '/queryAllCustomers';

export const deleteCustomerResourceService = serviceBaseAddress + '/deleteCustomerResource';

//payment
export const addPaymentService = serviceBaseAddress + '/addPayment';
export const deletePaymentService = serviceBaseAddress + '/deletePayment';
export const editPaymentService = serviceBaseAddress + '/editPayment';
export const queryPaymentsService = serviceBaseAddress + '/queryPayments';

export const deletePaymentResourceService = serviceBaseAddress + '/deletePaymentResource';

//journal
export const addJournalService = serviceBaseAddress + '/addJournal';
export const deleteJournalService = serviceBaseAddress + '/deleteJournal';
export const editJournalService = serviceBaseAddress + '/editJournal';
export const queryJournalsService = serviceBaseAddress + '/queryJournals';
export const queryPersonalJournalsService = serviceBaseAddress + '/queryPersonalJournals';

export const deleteJournalResourceService = serviceBaseAddress + '/deleteJournalResource';

export const queryJournalsTotalAmountService = serviceBaseAddress + '/queryJournalsTotalAmount';
export const queryJournalsIncrementService = serviceBaseAddress + '/queryJournalsIncrement';
export const queryMostJournalsPersonnelService = serviceBaseAddress + '/queryMostJournalsPersonnel';
export const queryMostEvectionPersonnelsService = serviceBaseAddress + '/queryMostEvectionPersonnels';
export const queryMostFrequentEvectionPlacesService = serviceBaseAddress + '/queryMostFrequentEvectionPlaces';
export const queryLeastJournalsPersonnelService = serviceBaseAddress + '/queryLeastJournalsPersonnel';
export const queryTotalsByProjectsService = serviceBaseAddress + '/queryTotalsByProjects';
export const queryTotalsByPersonnelsService = serviceBaseAddress + '/queryTotalsByPersonnels';
export const queryRatiosByProjectsService = serviceBaseAddress + '/queryRatiosByProjects';
export const queryRatiosByPersonnelsService = serviceBaseAddress + '/queryRatiosByPersonnels';
export const queryRatiosByMonthsService = serviceBaseAddress + '/queryRatiosByMonths';
export const queryEvectionsService = serviceBaseAddress + '/queryEvections';

//standard
export const addStandardService = serviceBaseAddress + '/addStandard';
export const deleteStandardService = serviceBaseAddress + '/deleteStandard';
export const editStandardService = serviceBaseAddress + '/editStandard';
export const queryStandardsService = serviceBaseAddress + '/queryStandards';

export const deleteStandardResourceService = serviceBaseAddress + '/deleteStandardResource';

//system
export const getAllOrganizationHierarchiesService = serviceBaseAddress + '/getAllOrganizationHierarchies';
export const getAllFunctionsHierarchiesService = serviceBaseAddress + '/getAllFunctionsHierarchies';

export const addOrganizationService = serviceBaseAddress + '/addOrganization';
export const editOrganizationService = serviceBaseAddress + '/editOrganization';
export const deleteOrganizationService = serviceBaseAddress + '/deleteOrganization';
export const queryOrganizationsService = serviceBaseAddress + '/queryOrganizations';
export const queryAllOrganizationsService = serviceBaseAddress + '/queryAllOrganizations';

export const addUserService = serviceBaseAddress + '/addUser';
export const editUserService = serviceBaseAddress + '/editUser';
export const deleteUserService = serviceBaseAddress + '/deleteUser';
export const queryUsersService = serviceBaseAddress + '/queryUsers';
export const queryAllUsersService = serviceBaseAddress + '/queryAllUsers';

//role
export const getAllRolesService = serviceBaseAddress + '/getAllRoles';
export const queryRolesService = serviceBaseAddress + '/queryRoles';
export const addRoleService = serviceBaseAddress + '/addRole';
export const editRoleService = serviceBaseAddress + '/editRole';
export const deleteRoleService = serviceBaseAddress + '/deleteRole';